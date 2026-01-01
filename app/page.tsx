"use client";

import { useFetch } from "@/hooks/useFetch";

type Post = {
  id: number;
  userId: number;
  title: string;
  body: string;
};

export default function Home() {
  const { data, loading, error } = useFetch<Post[]>(
    "https://jsonplaceholder.typicode.com/posts"
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  return (
    <div>
      <ul>
        {data?.map((item) => (
          <li key={item.id} className="mb-2">
            <h3 className="font-bold">
              {item.id}: {item.title}
            </h3>
            <p>{item.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
