import * as path from "node:path";
import type { Page, Node } from "@ktmage/spekta";
import { escapeHtml, renderInlineMarkup } from "../html.js";
import { pageUrlPath } from "../anchor.js";
import { findNode, filterNodes, getSections, getDisplayTitle } from "../ir-helpers.js";
import { renderSection } from "./section.js";

export function renderPageContent(
  page: Page,
  allPages: Page[],
  pageById: Map<string, Page>,
  imagePaths: string[],
  anchorMap: Map<string, string>,
): string {
  const parts: string[] = [];
  const displayTitle = getDisplayTitle(page);

  parts.push(`<div class="spec-content">`);
  parts.push(`  <h1 class="spec-content__title">${escapeHtml(displayTitle)}</h1>`);

  const summaryNode = findNode(page.children, "summary");
  const seeNodes = filterNodes(page.children, "see");
  const imageNode = findNode(page.children, "image");
  const graphNode = findNode(page.children, "graph");
  const textNodes = filterNodes(page.children, "text");
  const codeNodes = filterNodes(page.children, "code");
  const calloutNodes = filterNodes(page.children, "callout");
  const listNodes = filterNodes(page.children, "list");
  const sectionNodes = getSections(page.children);

  if (summaryNode) {
    parts.push(`  <p class="spec-content__summary">${renderInlineMarkup(summaryNode.text)}</p>`);
  }

  if (seeNodes.length > 0) {
    const links = seeNodes
      .map((seeNode) => {
        const refPage = pageById.get(seeNode.ref);
        if (!refPage) return "";
        return `<a href="${escapeHtml(pageUrlPath(refPage))}" class="spec-content__related-link">${escapeHtml(refPage.title)}</a>`;
      })
      .filter((link) => link !== "")
      .join(" ");
    if (links) {
      parts.push(`  <div class="spec-content__related">`);
      parts.push(`    <span class="spec-content__related-label">関連:</span>`);
      parts.push(`    ${links}`);
      parts.push(`  </div>`);
    }
  }

  for (const calloutNode of calloutNodes) {
    const labelMap = { note: "Note", warning: "Warning", tip: "Tip" } as const;
    parts.push(`  <div class="spec-callout--${calloutNode.variant}">`);
    parts.push(`    <div class="spec-callout__label">${labelMap[calloutNode.variant]}</div>`);
    parts.push(`    <div class="spec-callout__text">${renderInlineMarkup(calloutNode.text)}</div>`);
    parts.push(`  </div>`);
  }

  for (const textNode of textNodes) {
    parts.push(`  <p class="spec-text">${renderInlineMarkup(textNode.text)}</p>`);
  }

  if (imageNode) {
    imagePaths.push(imageNode.path);
    const filename = path.basename(imageNode.path);
    parts.push(`  <div class="spec-image">`);
    parts.push(`    <img src="/images/${escapeHtml(filename)}" alt="${escapeHtml(displayTitle)}" />`);
    parts.push(`  </div>`);
  }

  if (graphNode) {
    parts.push(`  <div class="spec-graph">`);
    parts.push(`    <div class="mermaid">${escapeHtml(graphNode.text)}</div>`);
    parts.push(`  </div>`);
  }

  for (const codeNode of codeNodes) {
    const langAttr = codeNode.language ? ` class="language-${escapeHtml(codeNode.language)}"` : "";
    parts.push(`  <pre class="spec-code"><code${langAttr}>${escapeHtml(codeNode.text)}</code></pre>`);
  }

  for (const listNode of listNodes) {
    if (listNode.children) {
      parts.push(`  <ul class="spec-list">`);
      for (const item of listNode.children) {
        parts.push(`    <li>${renderInlineMarkup(item.text)}</li>`);
      }
      parts.push(`  </ul>`);
    }
  }

  if (sectionNodes.length > 0) {
    parts.push(`  <div class="spec-content__body">`);
    for (const sectionNode of sectionNodes) {
      parts.push(renderSection(sectionNode, 1, allPages, pageById, imagePaths, anchorMap));
    }
    parts.push(`  </div>`);
  }

  parts.push(`</div>`);
  return parts.join("\n      ");
}
