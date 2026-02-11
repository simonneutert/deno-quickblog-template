/*
This file is part of "Deno QuickBlog Template", a simple static site generator built with Deno.
It is a showcase of how to use "Deno QuickBlog Template" to create a page from a JSON file and render it as markdown.
In other Static Site Generators, this features is usually labeled as "collections" or "data files".
In "Deno QuickBlog Template", we can simply import a JSON file and use Deno's built-in JSX to render a page.

Use this as a template for creating pages from JSON files.

Take it easy with JSX, it's just a syntax sugar for creating HTML elements.
Not a react component, so you don't need to worry about state or props.
If you want to learn more about precompiled JSX in Deno, you can check out the official documentation:
https://docs.deno.com/runtime/reference/jsx/#using-preact-with-rendertostring
*/

// deno-lint-ignore-file verbatim-module-syntax no-import-prefix no-unversioned-import
import React from "npm:@preact/compat";
import { render } from "jsr:@deno/gfm";
import data from "./books.json" with { type: "json" };

// this is a helper function that accepts the books and formats them in markdown
function formatCheckboxText(books) {
  return books.map((book) => {
    return `- [x] [${book.title}](${book.link}) by ${book.author}`;
  }).join("\n");
}

// the Books component renders the list of books as checkboxes to markdown and
// then uses the render function from @deno/gfm to convert it to HTML
export default function Books() {
  return (
    <div>
      <h1>List of Books</h1>
      {/* Render the list of books as checkboxes to markdown */}
      <div>
        <p
          dangerouslySetInnerHTML={{
            __html: render(formatCheckboxText(data.books)),
          }}
        >
        </p>
      </div>
    </div>
  );
}
