"use client";

import { useQuery } from "@tanstack/react-query";

type Post = {
  id: number;
  title: string;
  body: string;
};

export default function Home() {
  const { data, error, isLoading } = useQuery<Post[]>({
    queryKey: ["posts"],
    queryFn: async () => {
      const response = await fetch("http://localhost:4000/posts");
      if (!response.ok) {
        throw new Error("서버에서 데이터를 가져오는 데 실패했습니다.");
      }
      return response.json();
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error.message}</div>;
  return (
    <div className="flex h-screen items-center justify-center">
      <ul>
        {data?.map((item) => (
          <li key={item.id} className="mb-2 border-b border-gray-300 pb-2">
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
