import React from "react";
import { JsonNode } from "@/configuration/Shared/schema";

export function mapProps(props: Record<string, any> = {}): Record<string, any> {
  const mapped: Record<string, any> = { ...props };
  if ("class" in mapped && !("className" in mapped)) {
    mapped.className = mapped.class;
    delete mapped.class;
  }
  return mapped;
}

const allowedTags = new Set(["h1", "div", "section", "h2", "p"]);

export function renderNode(node: JsonNode, key?: React.Key): React.ReactNode {
  const tag = (node.tag || "div").toLowerCase();
  const className = node.className || "";

  
  if (!allowedTags.has(tag)) {
    return null;
  }

  const props = mapProps(node.props || {});

  // Default layout classes for container tags
  if (tag === "div") {
    props.className = ["space-y-10 leading-relaxed", props.className].filter(Boolean).join(" ");
  }
  if (tag === "section") {
    props.className = ["space-y-4", props.className].filter(Boolean).join(" ");
  }
  if (tag === "h1") {
    props.className = ["text-3xl font-extrabold mb-6", props.className].filter(Boolean).join(" ");
  }
  if (tag === "h2") {
    props.className = ["text-2xl font-bold tracking-tight", props.className].filter(Boolean).join(" ");
  }
  if (tag === "p") {
    props.className = ["text-lg", props.className].filter(Boolean).join(" ");
  }

  // If children is a string, render as HTML content
  if (typeof node.children === "string") {
    console.log(123)
    return React.createElement(tag, { ...props, key, dangerouslySetInnerHTML: { __html: node.children } });
  }

  // Otherwise, recursively render child nodes
  const childNodes = Array.isArray(node.children) ? node.children.map((c, i) => renderNode(c, i)) : undefined;
  return React.createElement(tag, { ...props, key }, childNodes);
}
