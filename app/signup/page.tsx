"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignupPage() {
  const router = useRouter();

  const [values, setValues] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // 유효성 검사 및 회원가입 로직
    console.log("회원가입 정보: ", values);

    router.push("/login");
  };
  return (
    <div className="h-[100dvh] flex justify-center items-center">
      <form onSubmit={onSubmit} className="flex flex-col gap-2">
        <div>
          <label htmlFor="email">이메일</label>
          <input
            className="border border-gray-300 rounded p-2 w-full"
            type="email"
            id="email"
            name="email"
            value={values.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="password">비밀번호</label>
          <input
            className="border border-gray-300 rounded p-2 w-full"
            type="password"
            id="password"
            name="password"
            value={values.password}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="passwordConfirm">비밀번호 확인</label>
          <input
            className="border border-gray-300 rounded p-2 w-full"
            type="password"
            id="passwordConfirm"
            name="passwordConfirm"
            value={values.passwordConfirm}
            onChange={handleChange}
          />
        </div>
        <button className="bg-blue-500 text-white p-2 rounded" type="submit">
          회원가입
        </button>
      </form>
    </div>
  );
}
