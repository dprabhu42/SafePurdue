// frontend/src/lib/api.ts

export type RankedResource = {
  name: string;
  url?: string;
  description?: string;
  tags?: string[];
};

export type AskResponse = {
  response: string;
  intent: string;
  resources: RankedResource[];
};

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

/**
 * Throws a clear error if the env var isn't set.
 * In Codespaces, this should be the forwarded URL for port 8000,
 * e.g. https://<something>-8000.app.github.dev
 */
function getApiBase(): string {
  if (!API_BASE) {
    throw new Error(
      "NEXT_PUBLIC_API_BASE_URL is not set. Create frontend/.env.local and set it, e.g.\n" +
        "NEXT_PUBLIC_API_BASE_URL=https://<your-codespaces>-8000.app.github.dev"
    );
  }
  return API_BASE.replace(/\/+$/, ""); // remove trailing slash(es)
}

export async function healthCheck(): Promise<{ status: string }> {
  const base = getApiBase();
  const res = await fetch(`${base}/health`, { method: "GET" });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Health check failed (${res.status}): ${text}`);
  }

  return res.json();
}

export async function askSafePurdue(message: string): Promise<AskResponse> {
  const base = getApiBase();

  const res = await fetch(`${base}/ask`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Ask request failed (${res.status}): ${text}`);
  }

  return res.json();
}