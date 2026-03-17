import { franc } from "franc";

const PDFJS_WORKER_VERSION = "5.5.207";
const MAX_FILE_SIZE_BYTES = 3 * 1024 * 1024; // 3MB
const MAX_PAGES = 5;
const MIN_TEXT_LENGTH_FOR_SCANNED_CHECK = 100; // below this = likely image-only (optional)
const MIN_TEXT_LENGTH_FOR_LANGUAGE_CHECK = 100; // need enough text to detect language

let _pdfjsLib: typeof import("pdfjs-dist") | null = null;
async function getPdfjs() {
  if (typeof window === "undefined") return null;
  if (_pdfjsLib) return _pdfjsLib;
  const lib = await import("pdfjs-dist");
  lib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${PDFJS_WORKER_VERSION}/build/pdf.worker.min.mjs`;
  _pdfjsLib = lib;
  return lib;
}

export class PdfRejectError extends Error {
  constructor(
    message: string,
    public readonly reason: "size" | "pages" | "encrypted" | "scanned" | "language"
  ) {
    super(message);
    this.name = "PdfRejectError";
  }
}

/**
 * Reads a PDF file, extracts all text from it, and logs it to the console.
 * Rejects if: file > 3MB, > 5 pages, encrypted, or (optionally) scanned/image-only.
 * @param file - A PDF file (e.g. from an input or drag-and-drop)
 * @returns The extracted text
 * @throws {PdfRejectError} When the file is rejected by validation
 */
export async function extractTextFromPdf(file: File): Promise<string> {
  if (file.type !== "application/pdf") {
    console.warn("extractTextFromPdf: file is not a PDF", file.name);
    return "";
  }

  const pdfjsLib = await getPdfjs();
  if (!pdfjsLib) return "";

  if (file.size > MAX_FILE_SIZE_BYTES) {
    throw new PdfRejectError(
      `PDF is too large (max 3MB). Size: ${(file.size / 1024 / 1024).toFixed(2)}MB`,
      "size"
    );
  }

  let pdf: Awaited<ReturnType<typeof pdfjsLib.getDocument>["promise"]>;
  try {
    const arrayBuffer = await file.arrayBuffer();
    pdf = await pdfjsLib.getDocument(arrayBuffer).promise;
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    const isPasswordError =
      msg.toLowerCase().includes("password") ||
      (err as { name?: string }).name === "PasswordException";
    if (isPasswordError) {
      throw new PdfRejectError("PDF is password-protected. Please use an unencrypted file.", "encrypted");
    }
    throw err;
  }

  const numPages = pdf.numPages;
  if (numPages > MAX_PAGES) {
    throw new PdfRejectError(
      `PDF has too many pages (max ${MAX_PAGES}). Found: ${numPages} pages`,
      "pages"
    );
  }

  const parts: string[] = [];
  for (let pageNum = 1; pageNum <= numPages; pageNum++) {
    const page = await pdf.getPage(pageNum);
    const textContent = await page.getTextContent();
    const pageText = textContent.items
      .map((item) => ("str" in item ? item.str : ""))
      .join(" ");
    parts.push(pageText);
  }

  const fullText = parts.join("\n\n").trim();

  // Optional: reject scanned/image-only PDFs (no or almost no extractable text)
  if (fullText.length < MIN_TEXT_LENGTH_FOR_SCANNED_CHECK) {
    throw new PdfRejectError(
      "PDF appears to be image-only (scanned) with no selectable text. Please use a PDF with selectable text.",
      "scanned"
    );
  }

  // Reject if the PDF text is not in English
  if (fullText.length >= MIN_TEXT_LENGTH_FOR_LANGUAGE_CHECK) {
    const detectedLang = franc(fullText);
    if (detectedLang !== "eng") {
      throw new PdfRejectError(
        "The CV must be in English. Please upload a PDF with English text.",
        "language"
      );
    }
  }

  console.log("[CV PDF text extraction]", { fileName: file.name, fullText });
  return fullText;
}
