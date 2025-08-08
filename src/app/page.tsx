import Container from "@/app/_components/container";
import { Intro } from "@/app/_components/intro";
import { PostsList } from "@/app/_components/posts-list";
import { getAllPosts } from "@/lib/api";
import { Suspense } from "react";

export default function Index() {
  const allPosts = getAllPosts();

  const postsList = allPosts;

  return (
    <main>
      <Container>
        <Suspense fallback={null}>
          <Intro />
        </Suspense>
        <Suspense fallback={<div>Loading...</div>}>
          <PostsList posts={postsList} />
        </Suspense>
      </Container>
    </main>
  );
}
