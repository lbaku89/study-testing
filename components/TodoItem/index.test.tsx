import { render, screen } from "@testing-library/react";
import TodoItem from "./index";

test("할 일 항목 상태 테스트", () => {
  const taskText = "할 일 항목";

  render(<TodoItem task={taskText} completed={true} />);
  // 텍스트 내용 확인
  const taskTextElement = screen.getByText(taskText);
  expect(taskTextElement).toHaveTextContent(taskText);

  // 체크박스가 체크되어 있는지 확인
  const checkBox = screen.getByRole("checkbox");
  expect(checkBox).toBeChecked();

  // 체크박스가 비활성화되어 있는지 확인
  expect(checkBox).toBeDisabled();

  // 수정 버튼이 비활성화되어 있는지 확인
  const editButtonByRole = screen.getByRole("button");
  expect(editButtonByRole).toBeDisabled();

  // 항목에 'completed' 클래스가 있는지 확인
  const taskList = screen.getByRole("listitem");
  expect(taskList).toHaveClass("completed");
});
