"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export function CopyEmailButton({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback if clipboard permission is denied
      window.location.href = `mailto:${email}`;
    }
  };

  return (
    <Button type="button" variant="secondary" onClick={handleCopy}>
      {copied ? (
        <>
          <Check className="h-4 w-4 text-primary" aria-hidden="true" />
          Copied to clipboard
        </>
      ) : (
        <>
          <Copy className="h-4 w-4" aria-hidden="true" />
          Copy email
        </>
      )}
    </Button>
  );
}
