---
title: "Add Theme switch"
excerpt: "Easily implement theme switching (dark mode compatible). Enhance user experience with one-click mode toggling, local storage persistence, and dynamic sun/moon icons."
coverImage: "/assets/blog/posts/braces-asterisk.svg"
date: "2025-08-11T22:35:07.322Z"
---
## How to add the ThemeSwitcher Component
The ThemeSwitcher component we're about to create comes with these great features:

With a single button click, the overall design theme of your website will toggle between light mode and dark mode.

The user's last selected theme setting will be automatically saved in their browser's local storage. This ensures that when they revisit your site, their preferred theme will persist, saving them the hassle of reconfiguring it.

The icon displayed on the button intelligently changes to match the theme's state. In light mode, a sun icon will appear, and in dark mode, a moon icon will be shown, providing a clear and visually intuitive UI.

## Overview of the ThemeSwitcher Component
First, let's look at the full code for the ThemeSwitcher component we'll be creating. You can copy this code and add it to your blog to immediately try out the theme-switching functionality.
```tsx:_components/theme-switcher.tsx
"use client"; // Directive often used in frameworks like Next.js

import { useEffect, useState } from "react";

/**
 * Theme switcher button component (Light/Dark)
 */
const ThemeSwitcher = () => {
  // State to manage the current theme. Initial value is "light".
  const [theme, setTheme] = useState<"light" | "dark">("light");

  // Boolean indicating if the current theme is dark mode.
  const isDark = theme === "dark";

  /**
   * Handler function to toggle the theme when the button is clicked.
   */
  const handleToggle = () => {
    // If current theme is dark, switch to light; otherwise, switch to dark.
    setTheme(isDark ? "light" : "dark");
  };

  /**
   * useEffect to load the theme from local storage when the component mounts.
   * Runs only once on initial render due to the empty dependency array ([]).
   */
  useEffect(() => {
    const localTheme = localStorage.getItem("theme");
    // If a valid theme is saved in local storage, apply it.
    if (localTheme === "dark" || localTheme === "light") {
      setTheme(localTheme as "light" | "dark");
    }
  }, []);

  /**
   * useEffect to update local storage and the HTML's data-theme attribute
   * whenever the theme state changes.
   * Runs whenever the 'theme' value changes due to 'theme' in the dependency array.
   */
  useEffect(() => {
    // Save the current theme to local storage.
    localStorage.setItem("theme", theme);
    // Set the data-theme attribute on document.documentElement (<html> tag).
    // This allows CSS to apply theme-specific styles.
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <button
      type="button"
      // Set an appropriate aria-label for screen readers based on the current mode.
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      // Click event handler.
      onClick={handleToggle}
      // Styling with Tailwind CSS classes.
      className="relative w-8 h-8 flex items-center justify-center transition-colors"
    >
      <span
        // Icon rotation animation and positioning.
        className={`absolute inset-0 flex items-center justify-center transition-transform duration-500 ${
          isDark ? "rotate-180" : "rotate-0"
        }`}
      >
        {/* Conditionally render moon or sun SVG icon based on isDark value. */}
        {isDark ? (
          // Moon SVG icon
          <svg
            className="fill-current w-7 h-7"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
          </svg>
        ) : (
          // Sun SVG icon
          <svg
            className="fill-current w-7 h-7"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
          </svg>
        )}
      </span>
    </button>
  );
};

export default ThemeSwitcher;
```

##  The ThemeSwitcher Code: Understanding Its Three Key Parts
The ThemeSwitcher component we've discussed effectively implements a user-friendly theme-switching feature by leveraging fundamental React hooks. Let's break down its mechanism into three main sections for a clearer understanding.

1. The Core of State Management: useState

```tsx
const [theme, setTheme] = useState<"light" | "dark">("light");
const isDark = theme === "dark";
```
This section is central to managing the current theme state of the component.

useState<"light" | "dark">("light"): React's useState hook is fundamental for adding state to functional components.
theme: This is the state variable that holds the current theme (either "light" or "dark"). The user interface will change its appearance based on the value of theme.

setTheme: This is the function used to update the value of theme. When this function is called, React re-renders the component, and the new theme is reflected in the UI. Since the initial value is set to "light", the component will render in light mode initially.

isDark variable: This is a simple boolean variable that checks whether the current theme is "dark". Using this variable makes the code more intuitive and readable when performing conditional checks based on the theme throughout the component.

2. The Key to Browser Persistence and UI Reflection: useEffect
The useEffect hook is used to perform side effects after a component has rendered. Here, it plays two crucial roles: remembering the user's theme setting and applying that theme across the entire HTML document.

#### Initial Theme Loading (Upon First Render)

```tsx
useEffect(() => {
  const localTheme = localStorage.getItem("theme");
  if (localTheme === "dark" || localTheme === "light") {
    setTheme(localTheme as "light" | "dark");
  }
}, []); // Empty dependency array [], so it runs only once when the component mounts
```
This first useEffect block executes only once when the component is first displayed in the browser (mounted).

localStorage.getItem("theme"): This attempts to read a value associated with the key "theme" from the browser's local storage. This checks if a previously set theme has been saved.

If a valid theme ("dark" or "light") is found in local storage, setTheme is used to set that theme as the current theme state. This mechanism ensures that if a user reloads the page or revisits later, their previous theme setting is automatically restored, providing a consistent user experience.

#### Persistence and HTML Attribute Update on Theme Change
```tsx
useEffect(() => {
  localStorage.setItem("theme", theme);
  document.documentElement.setAttribute("data-theme", theme);
}, [theme]); // Contains 'theme' in the dependency array, so it runs whenever 'theme' changes
```
This second useEffect block runs every time the value of the theme state changes.

localStorage.setItem("theme", theme): The current theme value is saved (updated) in local storage. This ensures that every time a user clicks the button to switch themes, their new preference is permanently recorded.

document.documentElement.setAttribute("data-theme", theme): This is the most critical step for applying the theme to the entire web page.

document.documentElement refers to the root element of the HTML document, which is the <html> tag.

A custom data attribute named data-theme is set on this <html> tag. For example, if the theme is light mode, it becomes <html data-theme="light">, and if it's dark mode, it becomes <html data-theme="dark">.

By utilizing this data-theme attribute, you can easily switch styles in your CSS. For instance, whether you're using Tailwind CSS or writing custom CSS, you can define your styles like this:
```css
/* Default light mode styles */
body {
  background-color: #ffffff; /* White background */
  color: #333333;    /* Dark text */
}

/* Styles when data-theme="dark" is set */
html[data-theme="dark"] body {
  background-color: #1a202c; /* Dark background */
  color: #e2e8f0;    /* Light text */
}
```
This allows you to dynamically change the background color, text color, icon color, border color, and any other visual elements of your website to match the current theme.

3. Button and Icon Interaction: UI Rendering
```tsx
<button
  type="button"
  aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
  onClick={handleToggle}
  className="relative w-8 h-8 flex items-center justify-center transition-colors"
>
  <span
    className={`absolute inset-0 flex items-center justify-center transition-transform duration-500 ${
      isDark ? "rotate-180" : "rotate-0"
    }`}
  >
    {/* Conditional rendering of moon or sun SVG icon based on isDark */}
    {isDark ? (
      // Moon SVG icon
    ) : (
      // Sun SVG icon
    )}
  </span>
</button>
```
This part defines the rendering logic for the button and the icon inside it, which the user directly interacts with.

onClick={handleToggle}: When the button is clicked, the handleToggle function is executed. As mentioned earlier, this function is responsible for toggling the theme state using setTheme.

aria-label attribute: This is crucial for accessibility. It clearly communicates the button's current function (whether it will switch to light mode or dark mode) to users who rely on screen readers. Since the text changes dynamically based on isDark, the appropriate information is always provided.

Conditional Icon Rendering:

The ternary operator {isDark ? (...) : (...)} is used to switch between the SVG icons based on the isDark value.

If isDark is true (dark mode), the moon SVG icon  is displayed.

If isDark is false (light mode), the sun SVG icon  is displayed.

Animation: The Tailwind CSS classes transition-transform duration-500 and the dynamically applied rotate-180 class on the span element create a beautiful animation where the icon smoothly rotates when switching. This provides a rich user experience and visually informs the user of the theme change instantly.

## Conclusion
The ThemeSwitcher component combines two powerful React hooks, useState and useEffect, to provide a simple yet highly functional theme-switching mechanism. It's an excellent example that encapsulates important web development concepts like state management, data persistence, and dynamic UI updates.

We hope this explanation helps deepen your understanding of the code.