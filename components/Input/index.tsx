"use client";

import { DeleteIconButton } from "./DeleteIconButton";

interface InputProps {
  id?: string;
  name?: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: "text" | "password" | "email" | "number"; // 필요한 타입을 추가할 수 있습니다.
  placeholder?: string;
  isError?: boolean; // 에러 상태를 나타내는 prop
  errorMessage?: string; // 에러 메시지를 나타내는 prop
  onDelete: () => void; // X 버튼 클릭 시 호출되는 함수
  // 추가적인 props가 필요하다면 여기에 정의할 수 있습니다.
}
export const Input = ({
  id,
  name,
  value,
  onChange,
  type = "text",
  placeholder,
  isError = false,
  errorMessage = "",
  onDelete,
}: InputProps) => {
  const borderColor = isError ? "border-red-500" : "border-gray-300";

  return (
    <div className="relative inline-block w-full">
      <div className="relative">
        <input
          id={id}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`p-2 pr-8 border ${borderColor} rounded-md w-full`}
        />
        {value && (
          <button
            type="button"
            // onClick={onDelete} -> 이렇게 실수로 지우거나
            // onClick={() => { console.log("!") }} -> 이렇게 이상한 함수를 넣는다면?
            // 혹은 onChange와 같이 다른 이벤트에 onDelete를 넣는다면?
            onClick={onDelete}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
            aria-label="입력값 지우기"
          >
            <DeleteIconButton />
          </button>
        )}
      </div>
      {isError && (
        <div className="text-red-500 text-sm ml-1 mt-1">{errorMessage}</div>
      )}
    </div>
  );
};
