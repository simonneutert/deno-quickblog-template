/*
This file is part of "Deno QuickBlog Template", a simple static site generator built with Deno.
It is a showcase of how to use "Deno QuickBlog Template" to create a page from a YAML file and render it as markdown.
In other Static Site Generators, this features is usually labeled as "collections" or "artists files".
In "Deno QuickBlog Template", we can simply import a YAML file and use Deno's built-in JSX to render a page.

Use this as a template for creating pages from YAML files.

Take it easy with JSX, it's just a syntax sugar for creating HTML elements.
Not a react component, so you don't need to worry about state or props.
If you want to learn more about precompiled JSX in Deno, you can check out the official documentation:
https://docs.deno.com/runtime/reference/jsx/#using-preact-with-rendertostring
*/

// deno-lint-ignore-file verbatim-module-syntax no-import-prefix no-unversioned-import
import React from "npm:@preact/compat";
import { render } from "jsr:@deno/gfm";
import { parse } from "jsr:@std/yaml";

// using toml?
// import { parse } from "jsr:@std/toml";

// in the yaml file, we have a list of artists with their name and description.
// no parent key was used, so we can directly parse the file and get the list of artists as an array.
const artists = parse(Deno.readTextFileSync("./pages/artists.yaml"));

// the Artists component renders the list of artists with search functionality
export default function Artists() {
  return (
    <div>
      <h1>List of Artists</h1>

      {/* Search input */}
      <div style="margin-bottom: 20px;">
        <input
          type="text"
          id="artist-search"
          placeholder="Search artists..."
          style="width: 100%; max-width: 500px; padding: 8px 12px; font-size: 16px; border: 1px solid #ccc; border-radius: 4px;"
        />
      </div>

      {/* Render all artists with data attributes for filtering */}
      <div id="artists-container">
        {artists.map((artist) => (
          <div
            key={artist.name}
            class="artist-item"
            data-name={artist.name.toLowerCase()}
            data-description={artist.description.toLowerCase()}
            dangerouslySetInnerHTML={{
              __html: render(`## ${artist.name}  
${artist.description}`),
            }}
          />
        ))}
      </div>

      <p
        id="no-results"
        style="display: none; color: #666; font-style: italic;"
      >
        No artists found
      </p>

      {/* Client-side search with 300ms debounce */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
        (function() {
          const searchInput = document.getElementById('artist-search');
          const artistItems = document.querySelectorAll('.artist-item');
          const noResults = document.getElementById('no-results');
          let debounceTimer;
          
          function filterArtists(query) {
            const lowerQuery = query.toLowerCase().trim();
            let visibleCount = 0;
            
            artistItems.forEach(item => {
              const name = item.getAttribute('data-name');
              const description = item.getAttribute('data-description');
              
              if (lowerQuery === '' || name.includes(lowerQuery) || description.includes(lowerQuery)) {
                item.style.display = '';
                visibleCount++;
              } else {
                item.style.display = 'none';
              }
            });
            
            noResults.style.display = visibleCount === 0 ? 'block' : 'none';
          }
          
          searchInput.addEventListener('input', function(e) {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => {
              filterArtists(e.target.value);
            }, 300);
          });
        })();
      `,
        }}
      />
    </div>
  );
}
