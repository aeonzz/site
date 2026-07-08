import GithubSlugger from "github-slugger";
import type { Heading, Root } from "mdast";
import { toString } from "mdast-util-to-string";
import remarkMdx from "remark-mdx";
import remarkParse from "remark-parse";
import { unified } from "unified";
import { visit } from "unist-util-visit";

type MdxTableOfContentsItem = {
  id: string;
  title: string;
  depth: 1 | 2 | 3;
};

const customIdPattern = /\s*\[#([^\]]+)]\s*$/;

function extractHeadingText(rawTitle: string) {
  const match = customIdPattern.exec(rawTitle);

  if (!match?.[1]) {
    return { id: undefined, title: rawTitle.trim() };
  }

  return {
    id: match[1],
    title: rawTitle.slice(0, match.index).trim(),
  };
}

function getMdxTableOfContents(content: string): MdxTableOfContentsItem[] {
  const tree = unified().use(remarkParse).use(remarkMdx).parse(content) as Root;
  const slugger = new GithubSlugger();
  const items: MdxTableOfContentsItem[] = [];

  visit(tree, "heading", (node: Heading) => {
    if (node.depth !== 1 && node.depth !== 2 && node.depth !== 3) {
      return;
    }

    const { id, title } = extractHeadingText(toString(node));

    items.push({
      id: id ?? slugger.slug(title),
      title,
      depth: node.depth,
    });
  });

  return items;
}

function getMdxHeadingId(title: string, slugger: GithubSlugger) {
  const heading = extractHeadingText(title);

  return heading.id ?? slugger.slug(heading.title);
}

export { getMdxHeadingId, getMdxTableOfContents, type MdxTableOfContentsItem };
