"use client";

import { useState } from "react";
import { Input } from "../Input";

export const LoginForm = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  // 유효성 상태 추가
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  // 이메일 유효성 검사 함수
  const validateEmail = (email: string) => {
    if (!email) return "이메일을 입력하세요.";
    // 간단한 이메일 정규식
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return "올바른 이메일 형식이 아닙니다.";
    return "";
  };

  // 비밀번호 유효성 검사 함수
  const validatePassword = (password: string) => {
    if (!password) return "비밀번호를 입력하세요.";
    if (password.length < 6) return "비밀번호는 6자 이상이어야 합니다.";
    return "";
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));

    // 입력값 변경 시 유효성 검사
    if (name === "email") {
      setErrors((prev) => ({ ...prev, email: validateEmail(value) }));
    }
    if (name === "password") {
      setErrors((prev) => ({ ...prev, password: validatePassword(value) }));
    }
  };

  const handleDelete = (field: keyof typeof values) => {
    setValues((prev) => ({ ...prev, [field]: "" }));

    setErrors((prev) => ({
      ...prev,
      [field]: field === "email" ? validateEmail("") : validatePassword(""),
    }));
  };

  return (
    <form className="flex flex-col gap-4 w-80 p-6 bg-white">
      <div>
        <label htmlFor="email" className="block mb-2">
          이메일
        </label>
        <Input
          id="email"
          name="email"
          value={values.email}
          onChange={handleChange}
          type="email"
          placeholder="이메일을 입력하세요"
          isError={!!errors.email}
          errorMessage={errors.email}
          onDelete={() => handleDelete("email")} // X 버튼 클릭 시 이메일 지우기
        />
      </div>
      <div>
        <label htmlFor="password" className="block mb-2">
          비밀번호
        </label>
        <Input
          id="password"
          name="password"
          value={values.password}
          onChange={handleChange}
          type="password"
          placeholder="비밀번호를 입력하세요"
          isError={!!errors.password}
          errorMessage={errors.password}
          onDelete={() => handleDelete("password")} // X 버튼 클릭 시 비밀번호 지우기
        />
      </div>
      <button
        className="bg-blue-500 rounded-md w-full cursor-pointer p-2 text-white"
        disabled={!values.email || !values.password}
      >
        로그인
      </button>
    </form>
  );
};
