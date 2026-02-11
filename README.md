# Deno QuickBlog Template

A simple blog generator powered by Deno,
[GitHub Flavored Markdown (GFM)](https://github.github.com/gfm/) and a little [preact](https://preactjs.com/).\
It's an all-in-one TypeScript static-site-generator for your next blog.

The logic is kept and tested in a separate repository [deno-quickblog](https://github.com/simonneutert/deno-quickblog).

> [!CAUTION]
> This project is in a public alpha stage. The engine will be pulled out into a
> separate package in the future, and this repository will serve as a
> demo/showcase/template for how to use it.\
> So expect breaking changes and a lot of updates in the near future. **Most
> likely I will drop and re-create the GitHub repository itself.**\
> But if you want to try it out and give feedback, please do! Just make sure to
> back up your content before pulling the latest changes.

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
cd deno-quickblog
```

Edit or create the following files and directories:

- `index.md` (the index/main template for your blog)
- `nav.md` (the navigation template for your blog)
- `footer.md` (the footer template for your blog)
- `pages/` (directory with your additional pages)
- `posts/` (directory with your markdown posts)
- `public/` (directory with your static assets like images)
- `dist/` (empty directory where the generated files will be placed)

It should look like this:

```
your-blog/
├── index.md
├── nav.md
├── footer.md
├── pages/
├── posts/
├── public/
└── dist/
```

```bash
deno run -A jsr:@simonneutert/quickblog build
```

#### Generate lists of posts in your pages

You can generate lists of posts in your pages by using the `{{ POSTS_LIST }}` or
`{{ POSTS_LIST(n) }}` syntax in your markdown files. The optional `n` parameter
specifies the number of latest posts to list. If `n` is not provided, all posts
will be listed.

### Upgrading from older versions

You should be able to pull the latest Docker image and run the same command as
above.

Git-based setups should be able to just pull the latest changes and run the same
command as above. (Make sure to back up your posts first! A detailed upgrade
path will be provided in future releases. But most of you should figure it out -
just make sure the `pages/`, `posts/`, and `public/` directories are preserved
with your content.)

## Local Development

1. Fork the repository.
2. Clone your fork locally.
3. Install Deno if you haven't already: https://deno.land/
4. Run locally:

```bash
deno run -A jsr:@simonneutert/quickblog build
# then serve to check the result on http://localhost:8000
deno run --allow-net --allow-read jsr:@std/http/file-server dist/
```

### Create a new post

Create a new blog post with TOML as front matter:

```bash
# default is toml front matter for the markdown
deno run -A jsr:@simonneutert/quickblog new "my new blog post"
```

You can use YAML, of course, too:

```bash
# Create a post with YAML frontmatter
deno run -A jsr:@simonneutert/quickblog new "My Post" --yaml
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

### Need another language?

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
