import { render, screen } from "@testing-library/react";
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
