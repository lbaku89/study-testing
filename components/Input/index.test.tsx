import { render, screen, fireEvent } from "@testing-library/react";
import { Input } from "./index";

test("input 컴포넌트 미 입력시 X 버튼이 보이지 않아야 한다. 확인하기", () => {
  render(<Input />);

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
  render(<Input defaultValue="입력값" />);

  const input = screen.getByRole("textbox");
  const deleteButton = screen.getByRole("button", {
    name: "입력값 지우기",
  });

  expect(input).toHaveValue("입력값");
  expect(deleteButton).toBeInTheDocument();
});

test("X 버튼 클릭 시 입력값이 없지는지 테스트", () => {
  render(<Input defaultValue="입력값" />);

  const input = screen.getByRole("textbox");
  const deleteButton = screen.getByRole("button", {
    name: "입력값 지우기",
  });
  // X 버튼 클릭
  fireEvent.click(deleteButton);

  // 입력값이 지워지고,
  expect(input).toHaveValue("");

  // X 버튼이 사라진다.
  expect(deleteButton).not.toBeInTheDocument();
});
