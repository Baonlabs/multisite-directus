"use client";
import React from "react";
import { JsonNode } from "@/configuration/Shared/schema/content";
import { renderNode } from "@/configuration/Shared/ultility/utils";

export default function ArticleRenderer({ data, className }: { data: JsonNode[] | string; className?: string }) {
  const nodes: JsonNode[] | null = (() => {
    try {
      if (typeof data === "string") {
        const parsed = JSON.parse(data);
        return Array.isArray(parsed) ? (parsed as JsonNode[]) : null;
      }
      return Array.isArray(data) ? data : null;
    } catch {
      return null;
    }
  })();

  if (!nodes) {
    return <article className={["leading-relaxed", className].filter(Boolean).join(" ")} />;
  }

  return (
    <article className={["leading-relaxed", className].filter(Boolean).join(" ")}>
      {nodes.map((n, i) => renderNode(n, i))}
    </article>
  );
}
