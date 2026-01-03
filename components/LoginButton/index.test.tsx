import { fireEvent, render, screen } from "@testing-library/react";
import { LoginButton } from "./index";
import { AuthProvider, AuthContext } from "@/contexts/AuthContext";
import { renderWithAuth } from "@/testHelpers/renderWithAuth";

describe("LoginButton 컴포넌트 테스트", () => {
  //테스트 코드에서도 Provider로 감싸줍니다.
  test("인증되지 않은 경우 로그인 버튼이 렌더링 되는지 확인", () => {
    render(
      <AuthProvider>
        <LoginButton />
      </AuthProvider>
    );

    // renderWithAuth(<LoginButton />);

    const loginButton = screen.getByRole("button", { name: "로그인" });
    expect(loginButton).toBeInTheDocument();
    expect(loginButton).toHaveClass("bg-blue-500");
  });

  //특정 상태(로그아웃) 테스트
  test("인증된 경우 로그아웃 버튼이 렌더링 되는지 확인", () => {
    const mockedContext = {
      isAuthenticated: true,
      login: jest.fn(),
      logout: jest.fn(),
    };

    render(
      // AuthProvider 대신 AuthContext.Provider를 사용하여 컨텍스트를 모킹합니다.
      <AuthContext.Provider value={mockedContext}>
        <LoginButton />
      </AuthContext.Provider>
    );
    // renderWithAuth(<LoginButton />, mockedContext);

    const logoutButton = screen.getByRole("button", { name: "로그아웃" });
    expect(logoutButton).toBeInTheDocument();
    expect(logoutButton).toHaveClass("bg-red-500");
  });

  //사용자 인터랙션 테스트
  test("로그인 버튼 클릭 시 로그인 함수가 호출되는지 확인", () => {
    const authValue = {
      isAuthenticated: false,
      login: jest.fn(),
      logout: jest.fn(),
    };

    render(
      <AuthContext.Provider value={authValue}>
        <LoginButton />
      </AuthContext.Provider>
    );
    // renderWithAuth(<LoginButton />, authValue);

    const loginButton = screen.getByRole("button", { name: "로그인" });
    fireEvent.click(loginButton);
    expect(authValue.login).toHaveBeenCalled();
  });

  // 실제 상태 변화가 생기는지 테스트

  test("로그인 버튼 클릭 시 로그아웃 버튼으로 변경되는지 확인(실제 상태 변화)", () => {
    render(
      <AuthProvider>
        <LoginButton />
      </AuthProvider>
    );
    // renderWithAuth(<LoginButton />);

    const loginButton = screen.getByRole("button", { name: "로그인" });
    expect(loginButton).toHaveClass("bg-blue-500");
    expect(loginButton).toBeInTheDocument();

    // 로그이 버튼 클릭
    fireEvent.click(loginButton);

    // 상태 변경 후 : 로그아웃 버튼으로 변경되었는지 확인
    const logoutButton = screen.getByRole("button", { name: "로그아웃" });
    expect(logoutButton).toBeInTheDocument();
    expect(logoutButton).toHaveClass("bg-red-500");
  });
});
