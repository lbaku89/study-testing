"use client";

import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="h-[100dvh] flex justify-center items-center">
      <form className="flex flex-col gap-2">
        <div>
          <label htmlFor="email">이메일</label>
          <input
            className="border border-gray-300 rounded p-2 w-full"
            type="email"
            id="email"
          />
        </div>
        <div>
          <label htmlFor="password">비밀번호</label>
          <input
            className="border border-gray-300 rounded p-2 w-full"
            type="password"
            id="password"
          />
        </div>
        <button className="bg-blue-500 text-white p-2 rounded" type="submit">
          로그인
        </button>
        <div className="text-center">
          <Link className="text-blue-400 underline" href="/signup">
            회원가입 페이지로 이동하기
          </Link>
        </div>
      </form>
    </div>
  );
}
