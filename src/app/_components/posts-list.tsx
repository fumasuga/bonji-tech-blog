"use client";
import { useState } from 'react';
import { useSearchParams } from "next/navigation";
import { Post } from "@/interfaces/post";
import { PostPreview } from "./post-preview";

type Props = {
  posts: Post[];
};

const POSTS_PER_PAGE = 6;

export function PostsList({ posts }: Props) {
  const searchParams = useSearchParams();
  const keyword = searchParams.get("q")?.trim() || "";

  const [currentPage, setCurrentPage] = useState(1);

  const hasKeyword = keyword.length > 0;

  const filteredPosts = hasKeyword
    ? posts.filter(post =>
      post.title.toLowerCase().includes(keyword.toLowerCase())
    )
    : posts;

  const hasResult = filteredPosts.length > 0;

  const totalPosts = filteredPosts.length;
  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;

  const currentPosts = filteredPosts.slice(startIndex, endIndex);

  const renderPaginationButtons = () => {
    const pages = [];
    const maxPagesToShow = 3;
    const startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);
    
    if (startPage > 1) {
      pages.push(
        <button
          key={1}
          onClick={() => setCurrentPage(1)}
          className={`px-4 py-2 mx-1 border rounded-md ${currentPage === 1 ? 'bg-gray-900 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
        >
          1
        </button>
      );
      if (startPage > 2) {
        pages.push(<span key="ellipsis-start" className="px-4 py-2">...</span>);
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => setCurrentPage(i)}
          className={`px-4 py-2 mx-1 border rounded-md ${currentPage === i ? 'bg-gray-900 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
        >
          {i}
        </button>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push(<span key="ellipsis-end" className="px-4 py-2">...</span>);
      }
      pages.push(
        <button
          key={totalPages}
          onClick={() => setCurrentPage(totalPages)}
          className={`px-4 py-2 mx-1 border rounded-md ${currentPage === totalPages ? 'bg-gray-900 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
        >
          {totalPages}
        </button>
      );
    }

    return pages;
  };

  return (
    <section className="px-[5%] md:px-[10%]">
      <div className="hidden md:block text-center">
        <p className="text-gray-500 mb-4">
          “Bonji” means “ordinary things“ in Japanese.
          I usually post what I have learned.
        </p>
      </div>
      {hasKeyword && !hasResult && (
        <div className="text-center text-gray-500 py-8">
          <p>No posts found for "<strong>{keyword}</strong>".</p>
          <p>Try searching for something else.</p>
        </div>
      )}
      <div className="grid grid-cols-1 lg:grid-cols-2 md:gap-x-4 gap-y-2 m-2 mb-28">
        {currentPosts.map((post) => (
          <PostPreview
            key={post.slug}
            title={post.title}
            coverImage={post.coverImage}
            date={post.date}
            slug={post.slug}
          />
        ))}
      </div>
      {hasResult && totalPages > 1 && (
        <div className="flex justify-center mt-8">
          {renderPaginationButtons()}
        </div>
      )}
    </section>
  );
}