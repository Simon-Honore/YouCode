import React from "react";
import Markdown from "react-markdown";

export default function MarkdownProse({ markdown }: { markdown: string }) {
  return (
    <Markdown className="prose dark:prose-invert lg:prose-lg xl:prose-xl">
      {markdown}
    </Markdown>
  );
}
