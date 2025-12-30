import { render, screen, fireEvent } from "@testing-library/react";
import { Input } from "./index";
import { useState } from "react";

test("input 컴포넌트 미 입력시 X 버튼이 보이지 않아야 한다. 확인하기", () => {
  render(<Input onChange={jest.fn()} onDelete={jest.fn()} />);

  const input = screen.getByRole("textbox");
  const deleteButton = screen.queryByRole("button", {
    name: "입력값 지우기",
  });

  // 입력값이 없고
  expect(input).toHaveValue("");
  // x 버튼이 보이지 않아야 함
  expect(deleteButton).not.toBeInTheDocument();
});

test("input 컴포넌트 입력시 X 버튼이 보여야한 한다. 확인하기", () => {
  render(<Input onChange={jest.fn()} onDelete={jest.fn()} value="입력값" />);

  const input = screen.getByRole("textbox");
  const deleteButton = screen.getByRole("button", {
    name: "입력값 지우기",
  });

  expect(input).toHaveValue("입력값");
  expect(deleteButton).toBeInTheDocument();
});

test("X 버튼 클릭 시 onDelete props에 전달된 함수가 호출되는지 확인한다", () => {
  const onDelete = jest.fn();

  render(<Input onChange={jest.fn()} onDelete={onDelete} value="입력값" />);

  const deleteButton = screen.getByRole("button", {
    name: "입력값 지우기",
  });

  // X 버튼 클릭
  fireEvent.click(deleteButton);

  // onDelete 함수가 호출되었는지 확인한다.
  expect(onDelete).toHaveBeenCalled();
});

test("Input 컴포넌트 에러 발생 시 에러 메시지가 보이는지 테스트", () => {
  render(
    <Input
      onChange={jest.fn()}
      onDelete={jest.fn()}
      isError={true}
      errorMessage="입력값에 문제가 있습니다."
    />
  );

  const errorMessage = screen.getByText("입력값에 문제가 있습니다.");

  // 에러 메시지가 보인다.
  expect(errorMessage).toBeInTheDocument();
});

test("X 버튼 클릭 시 입력값이 지워지는지 확인한다", () => {
  const Wrapper = () => {
    const [value, setValue] = useState("입력값");
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
    };
    const handleDelete = () => {
      setValue("");
    };
    return (
      <Input value={value} onChange={handleChange} onDelete={handleDelete} />
    );
  };

  render(<Wrapper />);

  const deleteButton = screen.getByRole("button", { name: "입력값 지우기" });

  fireEvent.click(deleteButton);

  const input = screen.getByRole("textbox");

  // 입력값이 지워지고
  expect(input).toHaveValue("");

  // X 버튼이 사라진다.
  expect(deleteButton).not.toBeInTheDocument();
});
