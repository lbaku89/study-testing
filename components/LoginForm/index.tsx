"use client";

import { useState } from "react";
import { Input } from "../Input";

export const LoginForm = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form className="flex flex-col gap-4 w-80 p-6 bg-white">
      <div>
        <label htmlFor="email" className="block mb-2">
          이메일
        </label>
        {/* Input에 value와 onChange를 넣을 수 없는 상황 */}
        <Input
          id="email"
          name="email"
          // 에러
          value={values.email}
          // 에러
          onChange={handleChange}
          onDelete={() => setValues((prev) => ({ ...prev, email: "" }))}
          type="email"
          placeholder="이메일을 입력하세요"
        />
      </div>
      <div>
        <label htmlFor="password" className="block mb-2">
          비밀번호
        </label>
        {/* Input에 value와 onChange를 넣을 수 없는 상황 */}
        <Input
          id="password"
          name="password"
          // 에러
          value={values.password}
          // 에러
          onChange={handleChange}
          onDelete={() => setValues((prev) => ({ ...prev, password: "" }))}
          type="password"
          placeholder="비밀번호를 입력하세요"
        />
      </div>
      <button className="bg-blue-500 rounded-md w-full cursor-pointer p-2 text-white">
        로그인
      </button>
    </form>
  );
};
