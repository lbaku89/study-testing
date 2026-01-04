"use client";

import axios from "axios";
import { useEffect, useState } from "react";

type Post = {
  id: number;
  title: string;
  body: string;
};

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const getPosts = async () => {
      const response = await axios.get("http://localhost:4000/posts");
      const data = response.data;
      setPosts(data);
    };
    getPosts();
  }, []);

  return (
    <main className="flex flex-col gap-4 items-center justify-center h-[100dvh]">
      <h1 className="text-2xl font-bold">게시물</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            {post.id}: {post.title}
          </li>
        ))}
      </ul>
    </main>
  );
}
