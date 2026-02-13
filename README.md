# Deno QuickBlog Template

A simple blog generator powered by Deno,
[GitHub Flavored Markdown (GFM)](https://github.github.com/gfm/) and a little
[preact](https://preactjs.com/).\
It's an all-in-one TypeScript static-site-generator for your next blog.

The logic is kept and tested in a separate repository
[deno-quickblog](https://github.com/simonneutert/deno-quickblog).

---

![Deno QuickBlog Template](/public/img/deno-quickblog-logo.png)

## Features

- Write blog posts in Markdown with GFM support.
- Easy to set up and use with Deno.
- Generates static HTML files for your blog.
- Supports "front matter" for post metadata ([TOML](https://toml.io/en/) and
  [YAML](https://yaml.org/)).
- Syntax highlighting for code blocks.
- JSX-Template-Support (others call this "collections" or "data files").
- Customizable templates for blog layout.
- Lightweight and super fast.
- An example of how you could implement a search. [/artists](pages/artists.md).

## Screenshots

<details>
  <summary>Click to expand screenshots 📸</summary>

---

> Index (Landing Page)
>
> ![Deno QuickBlog Template Index (Light Mode)](/public/img/deno-quickblog-screenshot-index.webp)

> Post with Code Snippet (Dark Mode)
>
> ![Deno QuickBlog Template Post with Code Snippet (Light Mode)](/public/img/deno-quickblog-screenshot-sample-post-with-codesnip-darkmode.webp)

> Data-Driven Page (JSX Template)
>
> ![Deno QuickBlog Template Post (Dark Mode)](/public/img/deno-quickblog-screenshot-sample-collection-page.webp)

</details>

## How It Works

Deno QuickBlog Template reads markdown files from the `pages/` and `posts/`
directories, processes them to HTML, and generates a static blog in the `dist/`
directory. It uses a simple template system to create the blog layout and
supports "front matter" ([TOML](https://toml.io/en/) and
[YAML](https://yaml.org/)) for post metadata like title and date.

Images and other static assets can be placed in the `public/` directory and will
be copied to the `dist/public/` directory during the build process. So you can
link to them in your posts or templates. See [index.md](index.md) for an example
of how to link to an image in the `public/` directory.

Markdown files in the `pages/` directory are treated as standalone pages. The
filename will be the route (e.g., `about.md` becomes `/about.html`). Pages can
also be organized in subdirectories within `pages/` (e.g.,
`pages/projects/project1.md` becomes `/projects/project1.html`).

Put your posts in the `posts/` directory as markdown files with front matter.
For example, see
[posts/2026-02-03-first-post.md](posts/2026-02-01-first-post.md). Posts can also
be organized in subdirectories within `posts/` for better organization (e.g.,
`posts/2025/2025-08-13-old-post.md`).

The naming convention for posts is `YYYY-MM-DD-post-title.md`. The date in the
filename is used for sorting posts by date. **This is mandatory for you to
follow.**

### Optional: Posts Without Front Matter

While front matter is recommended, you can also write posts without it. The
system will automatically:

- Extract the title from the first `#`, `##`, or `###` heading found
- Fall back to the first non-empty line if no heading exists (truncated to 40
  characters by default)
- You can customize the fallback title length with the
  `DENO_QUICKBLOG_TITLE_MAX_LENGTH` environment variable

## Getting Started

One of the easiest ways to use Deno QuickBlog Template is through Docker/Podman.

### Use this repo to generate your own posts

Fork this repository to create your own blog. Then clone your fork locally.:

```bash
git clone <your-fork-url>
cd <your-fork-repo>
```

To build the blog into the `dist/` directory, run:

```bash
deno run -A jsr:@simonneutert/quickblog@0.0.2 build
```

## Features

For the latest and greatest features, check the
[deno-quickblog repository](https://github.com/simonneutert/deno-quickblog).
Here's a quick overview of some of the features you can use in your blog:

## Create a new post

Create a new blog post with TOML as front matter:

```bash
# default is toml front matter for the markdown
deno run -A jsr:@simonneutert/quickblog@0.0.2 new "my new blog post"
```

You can use YAML, of course, too:

```bash
# Create a post with YAML frontmatter
deno run -A jsr:@simonneutert/quickblog@0.0.2 new "My Post" --yaml
```

## Template Helpers

### The `{{ POSTS_LIST }}` Helper in Markdown Files

You can generate lists of posts in your pages by using the `{{ POSTS_LIST }}` or
`{{ POSTS_LIST(n) }}` syntax in your markdown files. The optional `n` parameter
specifies the number of latest posts to list. If `n` is not provided, all posts
will be listed.

### Latest Posts with Full Content

Use the {{ LATEST_POSTS }} placeholder to display the full content of the latest
post, or {{ LATEST_POSTS(n) }} to display the latest n posts:

```markdown
# Most Recent Post

{{ LATEST_POSTS }}

# Render 5 of the Most Recent Posts

{{ LATEST_POSTS(5) }}
```

## Upgrading from older versions

The engine is in a separate repository and is versioned independently. Follow
the Changelog in the
[deno-quickblog repository](https://github.com/simonneutert/deno-quickblog) for
any breaking changes or updates.

## Local Development

1. Fork the repository.
2. Clone your fork locally.
3. Install Deno if you haven't already: https://deno.land/
4. Run locally:

```bash
# OPTIONAL: clean deno cache to make sure you get the latest version of the engine
deno clean

# build the blog into the dist/ directory
deno run -A jsr:@simonneutert/quickblog@0.0.2 build
# then serve to check the result on http://localhost:8000
deno run --allow-net --allow-read jsr:@std/http/file-server dist/
```

## Host with Docker/Podman

```bash
# --no-cache is important
docker build \
    --no-cache \
    -f Containerfile.prod \
    -v $(pwd)/index.md:/app/index.md:Z \
    -v $(pwd)/nav.md:/app/nav.md:Z \
    -v $(pwd)/footer.md:/app/footer.md:Z \
    -v $(pwd)/pages:/app/pages:Z \
    -v $(pwd)/posts:/app/posts:Z \
    -v $(pwd)/public:/app/public:Z \
    -t deno-quickblog-prod
```

Then run the container:

```bash
docker run --rm -it -p 8080:80 deno-quickblog-prod
```

## Customization / FAQ

### Need your language? (Internationalization)

Pass the environment variable `DENO_QUICKBLOG_LANG` when running the container.
For example, for Spanish:

```bash
docker run --rm -it -p 8080:80 -e DENO_QUICKBLOG_LANG=es deno-quickblog-prod
```

Make sure to also update the `index.md`, `nav.md`, and `footer.md` templates
with the appropriate translations for your language.

### You do not need a footer?

`export DENO_QUICKBLOG_HIDE_FOOTER=1`

This lets you hide the footer if you don't need it. Just set the environment
variable when running/building the blog.

### Customize fallback title length

For posts without front matter, the fallback title defaults to 40 characters.
You can customize this:

```bash
export DENO_QUICKBLOG_TITLE_MAX_LENGTH=60
```

## Help / Troubleshooting

- Check for proper front matter formatting in your markdown files.
- Make sure your posts follow the `YYYY-MM-DD-post-title.md` naming convention.
- Ensure there are no naming collisions between files in the `public/` and
  `pages/` directories.
- Check the console output for any error messages during the build process.
