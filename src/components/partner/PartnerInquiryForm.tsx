"use client";

import { useState } from "react";
import { Stack, Button, Input, FormField, TextArea, Text } from "@/components/ui";

export function PartnerInquiryForm() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [organization, setOrganization] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!fullName.trim()) {
      setError("Please enter your name.");
      return;
    }
    if (!email.trim()) {
      setError("Please enter your work email.");
      return;
    }
    if (!message.trim()) {
      setError("Please tell us about your partnership idea (message).");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/partner-inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: fullName.trim(),
          email: email.trim(),
          organization: organization.trim(),
          message: message.trim(),
        }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };

      if (!res.ok) {
        setError(data.error || "Something went wrong. Please try again.");
        return;
      }

      setSuccess(true);
      setFullName("");
      setEmail("");
      setOrganization("");
      setMessage("");
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <Stack gap={12} style={{ marginTop: 8 }}>
        <Text as="p" style={{ color: "var(--color-text-secondary)" }}>
          Thanks — we received your message and will get back to you soon.
        </Text>
        <Button
          type="button"
          variant="secondary"
          onClick={() => setSuccess(false)}
        >
          Send another message
        </Button>
      </Stack>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <Stack gap={14} style={{ marginTop: 8 }}>
        <FormField id="partner-full-name" label="Full name" required>
          {(props) => (
            <Input
              {...props}
              type="text"
              autoComplete="name"
              placeholder="Jane Doe"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              disabled={loading}
              invalid={!!error}
            />
          )}
        </FormField>

        <FormField id="partner-email" label="Work email" required>
          {(props) => (
            <Input
              {...props}
              type="email"
              autoComplete="email"
              placeholder="you@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              invalid={!!error}
            />
          )}
        </FormField>

        <FormField
          id="partner-organization"
          label="Organization"
          hint="Optional — company, community, or program name."
        >
          {(props) => (
            <Input
              {...props}
              type="text"
              autoComplete="organization"
              placeholder="Acme Inc."
              value={organization}
              onChange={(e) => setOrganization(e.target.value)}
              disabled={loading}
            />
          )}
        </FormField>

        <FormField
          id="partner-message"
          label="Message"
          required
          hint="Audience, goals, timeline, or integration needs."
        >
          {(props) => (
            <TextArea
              {...props}
              rows={6}
              placeholder="Tell us what you have in mind…"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              disabled={loading}
              invalid={!!error}
            />
          )}
        </FormField>

        {error ? (
          <p role="alert" style={{ fontSize: 13, color: "var(--color-danger)", margin: 0 }}>
            {error}
          </p>
        ) : null}

        <div>
          <Button type="submit" disabled={loading}>
            {loading ? "Sending…" : "Send message"}
          </Button>
        </div>
      </Stack>
    </form>
  );
}
