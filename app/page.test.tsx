import { render, screen } from "@testing-library/react";
import Home from "./page";
test("테스트", () => {
  render(<Home />);
  const mainPageText = screen.getByText("메인 페이지");
  expect(mainPageText).toBeInTheDocument();
});
