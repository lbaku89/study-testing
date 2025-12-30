import { render, screen } from "@testing-library/react";
import Home from "./page";

test("메인페이지 텍스트가 제대로 보여지는 확인하기", () => {
  render(<Home />);

  const element = screen.getByText("컴포넌트 테스트 연습하기");
  expect(element).toBeInTheDocument();
});
