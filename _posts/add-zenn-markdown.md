---
title: "Add Zenn markdown"
excerpt: "This blog explains how to integrate Zenn's expressive Markdown into a Next.js blog using official packages like zenn-markdown-html."
coverImage: "/assets/blog/posts/braces-asterisk.svg"
date: "2025-08-09T14:36:00.000Z"
---
## How to Use Zenn-Style Markdown

Zenn's unique syntaxes (like message boxes, code blocks with filenames, and footnotes) can significantly enhance the expressiveness of your articles.
In just a few steps, your blog will be able to publish articles that are as visually appealing and easy to read as those on Zenn.

Before we start, please make sure you have the following:
* Node.js and npm/Yarn: Installed in your development environment.
* Next.js Project: An existing blog project built with Next.js.
* Basic JavaScript/TypeScript Knowledge: Ability to read and write code.

## Install Necessary Packages
First, let's install the packages required to convert Zenn Markdown to HTML and apply styles. We'll use zenn-markdown-html, officially provided by Zenn, along with zenn-content-css for styling and zenn-embed-elements to handle embedded content (like YouTube videos).

Open your terminal and run the following command in the root directory of your Next.js project:
```bash
npm install zenn-markdown-html zenn-content-css zenn-embed-elements
# Or yarn add zenn-markdown-html zenn-content-css zenn-embed-elements
```
## Modify markdownToHtml.ts
Next, I'll modify a file named markdownToHtml.ts in the lib directory to define a function that converts Markdown strings to HTML.

```ts:li/markdownToHtml.ts
import m2h from "zenn-markdown-html";

export default async function markdownToHtml(markdown: string) {
  return m2h(markdown)
}
```
In this file, simply using the imported zennMarkdownToHtml function allows us to convert Zenn Markdown without complex configurations. This function internally combines various unified and remark/rehype plugins (for highlighting, external link processing, etc.), enabling us to achieve Zenn-style rendering with simple code.

## Use in Next.js Pages
Finally, we'll call the markdownToHtml function in a Next.js page (or component) to render your Markdown content. In a typical blog, this conversion is done when fetching article data.

For example, you could use this on a blog post detail page. In getStaticProps (or getServerSideProps), you would read the Markdown file and then convert it to HTML using the markdownToHtml function. The resulting HTML string is then passed as a prop to your component, where you can render it using dangerouslySetInnerHTML.

```tsx:posts/[slug].tsx (Example)
import markdownToHtml from "@/lib/markdownToHtml";

{/* ... Other content ... */}

  const post = getPostBySlug(params.slug);

  if (!post) {
    return notFound();
  }

  const content = await markdownToHtml(post.content || "");

```

```tsx:_components/post-body.tsx (Example)
import markdownStyles from "./markdown-styles.module.css";

type Props = {
  content: string;
};

export function PostBody({ content }: Props) {
  return (
    <div className="max-w-2xl mx-auto mt-16 znc">
      <div
        className={markdownStyles["markdown"]}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
}
```

## Important Notes

When using dangerouslySetInnerHTML, please only use it with HTML from trusted sources. Do not use it with untrusted content, such as user input.

Also, to display Zenn Markdown beautifully, you need to apply zenn-content-css. This is usually done by importing it in your Next.js global CSS file (e.g., styles/globals.css) with @import 'zenn-content-css';, or by copying the necessary Zenn CSS files into your project.

Furthermore, if you use Zenn's unique embedded elements (like YouTube embeds) in your articles, you'll need to enable zenn-embed-elements. This is typically done by loading zenn-embed-elements from a CDN, or in Next.js, by using the next/script component for lazy loading.

If you're using Tailwind CSS, consider also using the @tailwindcss/typography plugin. It helps to style basic HTML elements while allowing you to apply custom styles to Zenn's unique elements.

----
We've covered the steps to integrate zenn-markdown-html, zenn-content-css, and zenn-embed-elements packages into your Next.js project, create markdownToHtml.ts, and utilize it on your pages. Now your Next.js blog can express rich Markdown content just like Zenn.
Github:[Zenn-editor](https://github.com/zenn-dev/zenn-editor)