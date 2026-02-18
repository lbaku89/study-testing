"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

type Post = {
  id: number;
  title: string;
  body: string;
};

export default function Home() {
  const [data, setData] = useState<Post | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/posts/1");
        setData(response.data);
      } catch {
        setError("데이터를 불러오는데 실패했습니다.");
      }
    };
    fetchData();
  }, []);
  return (
    <ul>
      {data && (
        <li key={data.id} className="border p-4">
          <h3 className="font-bold">
            {data.id}: {data.title}
          </h3>
          <p>{data.body}</p>
        </li>
      )}
      {error && <p className="text-red-500">{error}</p>}
    </ul>
  );
}

// export default function Home() {
//   const { data, error, isLoading } = useQuery<Post[]>({
//     queryKey: ["posts"],
//     queryFn: async () => {
//       const response = await fetch("http://localhost:4000/posts");
//       if (!response.ok) {
//         throw new Error("서버에서 데이터를 가져오는 데 실패했습니다.");
//       }
//       return response.json();
//     },
//   });

//   const [values, setValues] = useState({ title: "", body: "" });

//   const queryClient = useQueryClient();

//   const createPostMutation = useMutation({
//     mutationFn: async (newPost: Omit<Post, "id">) => {
//       const response = await fetch("http://localhost:4000/posts", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(newPost),
//       });
//       if (!response.ok) {
//         throw new Error("포스트 생성에 실패했습니다.");
//       }
//       return response.json();
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["posts"] });
//     },
//   });

//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     createPostMutation.mutate(values);
//     setValues({ title: "", body: "" }); // 폼 초기화
//   };

//   if (isLoading) return <div>Loading...</div>;
//   if (error) return <div className="text-red-500">{error.message}</div>;
//   return (
//     <div className="flex h-screen items-center justify-center">
//       <div>
//         <form onSubmit={handleSubmit} className="mb-4 flex flex-col gap-2">
//           <div>
//             <label htmlFor="title">제목</label>
//             <input
//               id="title"
//               className="w-full rounded border border-gray-300 p-2"
//               value={values.title}
//               onChange={(e) => setValues({ ...values, title: e.target.value })}
//             />
//           </div>
//           <div>
//             <label htmlFor="body">본문</label>
//             <textarea
//               id="body"
//               className="w-full rounded border border-gray-300 p-2"
//               value={values.body}
//               onChange={(e) => setValues({ ...values, body: e.target.value })}
//             />
//           </div>
//           <button
//             type="submit"
//             className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
//           >
//             제출
//           </button>
//         </form>
//         <ul>
//           {data?.map((item) => (
//             <li key={item.id} className="mb-2 border-b border-gray-300 pb-2">
//               <h3 className="font-bold">
//                 {item.id}: {item.title}
//               </h3>
//               <p>{item.body}</p>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }
