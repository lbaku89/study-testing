import { render, screen, fireEvent } from "@testing-library/react";
import { ThemeToggle } from "./index";
import { ThemeProvider, ThemeContext } from "@/contexts/ThemeContext";
import { renderWithTheme } from "@/testHelpers/renderWithTheme";
describe("ThemeToggle 컴포넌트 테스트", () => {
  test("라이트 모드 버튼 초기 렌더링", () => {
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    );

    // renderWithTheme(<ThemeToggle />);

    const toggleButton = screen.getByRole("button", {
      name: "다크 모드로 전환",
    });
    expect(toggleButton).toBeInTheDocument();
  });

  test("다크 모드 버튼 초기 렌더링", () => {
    render(
      <ThemeContext.Provider value={{ theme: "dark", toggleTheme: jest.fn() }}>
        <ThemeToggle />
      </ThemeContext.Provider>
    );

    // renderWithTheme(<ThemeToggle />, { theme: "dark" });

    const toggleButton = screen.getByRole("button", {
      name: "라이트 모드로 전환",
    });
    expect(toggleButton).toBeInTheDocument();
  });

  test("다크 모드 버튼 클릭 시 라이트 모드로 전환", async () => {
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    );
    // renderWithTheme(<ThemeToggle />);

    const toggleButton = screen.getByText("다크 모드로 전환");

    fireEvent.click(toggleButton);

    expect(screen.getByText("라이트 모드로 전환")).toBeInTheDocument();
  });
});
