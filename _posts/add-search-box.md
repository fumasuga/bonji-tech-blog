---
title: "Add Search box"
excerpt: "This section details filtering blog posts using the URL's 'q' query parameter. It retrieves the keyword, case-insensitively filters posts by title, and shows all posts if no keyword, delivering content based on user search intent."
coverImage: "/assets/blog/posts/braces-asterisk.svg"
date: "2025-08-10T07:00:00.000Z"
---
## How to Add the Search Box Component
This time, we'll dive deep into how to implement such a search box using React and Next.js.

## Overview of the Search Box Code
First, let's take a look at the complete code for the component we'll be discussing.
```tsx:_components.search-box.tsx
'use client';
import { useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function SearchBox() {
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('q') || '');
  const router = useRouter();
  const pathname = usePathname();

  const handleSearch = () => {
    if (search.trim()) {
      router.push(`/?q=${encodeURIComponent(search.trim())}`);
    } else if (search === '' && pathname === '/') {
      router.push('/');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="hidden md:block relative w-40 md:w-64">
      <input
        type="text"
        placeholder="Search the post..."
        className="block w-full pl-4 md:pl-10 pr-10 py-2 border border-gray-300 rounded-md text-xs md:text-sm"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button
        type="button"
        className="absolute inset-y-0 right-0 pr-3 flex items-center"
        onClick={handleSearch}
        aria-label="Search"
      >
        <img src="/favicon/research.png" width="16" height="16" alt="Search Icon" className="h-6 w-6 duration-350 hover:opacity-50" />
      </button>
    </div>
  );
}
```
This code is a client component designed to work with Next.js's App Router.

## Program Explanation
Let's break down the key aspects of this code into five steps.

1. Importing Necessary Hooks

```tsx
import { useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
```
useState: Used to manage the string entered into the search box as component state.
usePathname: Used to get the current page's pathname (e.g., '/' or '/about').
useRouter: Used to programmatically navigate between pages.
useSearchParams: Used to access URL query parameters (e.g., ?q=searchterm).

2. State Management

```tsx
const searchParams = useSearchParams();
const [search, setSearch] = useState(searchParams.get('q') || '');
```
useSearchParams() is used to get the current URL's query parameters.
By setting the initial value of useState to searchParams.get('q'), the search box will display the value of the q parameter if it already exists in the URL. This ensures that the search content is retained even if the page is reloaded.

3. Implementing the Search Functionality

```tsx
const handleSearch = () => {
  if (search.trim()) {
    router.push(`/?q=${encodeURIComponent(search.trim())}`);
  } else if (search === '' && pathname === '/') {
    router.push('/');
  }
};
```
The handleSearch function encapsulates the search logic.
search.trim() removes leading and trailing whitespace from the input string.
If search.trim() has a value, router.push() is used to navigate to a URL in the format /?q=searchterm.
encodeURIComponent() is crucial for correctly handling special characters in the search term when forming the URL.
If the search box is empty and the current path is the home page ('/'), it navigates back to the home page using router.push('/').

4. Event Handlers

```tsx
const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
  if (e.key === 'Enter') {
    handleSearch();
  }
};
```
The handleKeyDown function calls handleSearch when the user presses the Enter key on the keyboard. This allows initiating a search without clicking the button.

5. JSX Rendering

```tsx
return (
  <div className="hidden md:block relative w-40 md:w-64">
    {/* ... input and button ... */}
  </div>
);
```
An input tag is used for the search box, and a button tag displays the search icon.
className="hidden md:block" hides the search box on mobile screens and displays it on tablet and PC screens (at or above the md breakpoint).
The input's value is bound to the search state, and the onChange event calls setSearch to keep the input content synchronized with the search state.
The button's onClick event is assigned the handleSearch function.

## Applying the Search Keyword to Filter Posts
Here's an example of how you might use the keyword obtained from the search box to filter a list of posts. This code would typically be in the page component where you display your blog posts.
```tsx
const searchParams = useSearchParams();
const keyword = searchParams.get("q")?.trim() || "";

const hasKeyword = keyword.length > 0;

const filteredPosts = hasKeyword
  ? posts.filter(post =>
    post.title.toLowerCase().includes(keyword.toLowerCase())
  )
  : posts;
```
keyword: This constant retrieves the q parameter from the URL, which contains the search term entered by the user. It also trim()s any whitespace.
hasKeyword: A boolean flag indicating whether a search keyword is present.
filteredPosts: This array is generated based on whether a keyword exists.
If a keyword is present, it filters the original posts array. The filter condition checks if the post.title (converted to lowercase) includes the keyword (also converted to lowercase) for a case-insensitive search.
If no keyword is present, filteredPosts simply becomes the original posts array, showing all available posts.

## Conclusion
This search box component, by combining React and Next.js hooks, achieves a simple yet highly functional search capability.

useState: Managing search input
useSearchParams: Synchronizing with the URL
useRouter: Page navigation
usePathname: Determining the current page path

It's clear how effectively these hooks can be utilized to create a user-friendly search box that retains its state.