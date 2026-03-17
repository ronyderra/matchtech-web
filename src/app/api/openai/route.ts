export async function POST(req: Request) {
  try {
    const body = await req.json();

    const cvText = body?.CV ?? body?.text ?? body?.cv;
    if (!cvText) {
      return new Response(JSON.stringify({ error: "Missing CV" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (!process.env.OPENAI_API_KEY) {
      return new Response(JSON.stringify({ error: "Missing OPENAI_API_KEY" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    const model = process.env.OPENAI_MODEL || "gpt-4.1-mini";

    const systemPrompt = `You are a CV parsing engine.

Your job is to extract structured data from a resume/CV text.

You will receive:
- A field called "CV" that contains raw resume text

CRITICAL RULES:
1. Return ONLY valid JSON
2. Do NOT return any text before or after the JSON
3. Do NOT explain anything
4. Do NOT include comments
5. If a field is missing, return null
6. If a list is empty, return []
7. Do NOT hallucinate data
8. Keep all keys EXACTLY as defined below

OUTPUT FORMAT:
{
  "firstName": string | null,
  "lastName": string | null,
  "email": string | null,
  "phone": string | null,
  "country": string | null,
  "city": string | null,
  "bio": string | null,
  "linkedin": string | null,
  "portfolio": string | null,
  "github": string | null,
  "resumeUrl": null,
  "experience": [
    {
      "companyName": string | null,
      "industry": string | null,
      "years": string | null,
      "role": string | null
    }
  ],
  "skills": string[],
  "languages": string[]
}`;

    const openaiResponse = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model,
        text: {
          format: {
            type: "json_object",
          },
        },
        input: [
          {
            role: "system",
            content: [
              {
                type: "input_text",
                text: systemPrompt,
              },
            ],
          },
          {
            role: "user",
            content: [
              {
                type: "input_text",
                text: `CV: ${String(cvText)}`,
              },
            ],
          },
        ],
      }),
    });

    const data = await openaiResponse.json();

    if (!openaiResponse.ok) {
      return new Response(JSON.stringify(data), {
        status: openaiResponse.status,
        headers: { "Content-Type": "application/json" },
      });
    }

    const outputText =
      data.output_text ??
      data.output?.[0]?.content?.find((item: any) => item.type === "output_text")?.text;

    if (!outputText) {
      return new Response(
        JSON.stringify({ error: "OpenAI returned no output text", raw: data }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    let parsed;
    try {
      parsed = JSON.parse(outputText);
    } catch {
      return new Response(
        JSON.stringify({ error: "Model did not return valid JSON", raw: outputText }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    return new Response(JSON.stringify(parsed), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: "Failed to send data to OpenAI",
        details: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}