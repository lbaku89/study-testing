import { fireEvent, render, screen } from "@testing-library/react";
import { LoginForm } from "./index";

describe("로그인 폼 렌더링 테스트", () => {
  let loginButton: HTMLButtonElement,
    emailInput: HTMLInputElement,
    passwordInput: HTMLInputElement;

  beforeEach(() => {
    // 모든 테스트 전에 LoginForm 컴포넌트를 렌더링합니다.
    render(<LoginForm />);
    loginButton = screen.getByRole("button", { name: "로그인" });
    emailInput = screen.getByLabelText("이메일");
    passwordInput = screen.getByLabelText("비밀번호");
  });

  describe("버튼 활성화 상태", () => {
    test("로그인 폼의 이메일과 비밀번호 미입력 시 로그인 버튼 비활성화되는지 확인", () => {
      // 입력 필드 값이 비어있는지 확인
      expect(emailInput).toHaveValue("");
      expect(passwordInput).toHaveValue("");

      // 로그인 버튼이 비활성화되어 있는지 확인
      expect(loginButton).toBeDisabled();
    });
    test("이메일, 비밀번호 입력 시 로그인 버튼 활성화되는지 확인", () => {
      // 이메일과 비밀번호 입력
      fireEvent.change(emailInput, { target: { value: "test@test.com" } });
      fireEvent.change(passwordInput, { target: { value: "test" } });

      // 로그인 버튼이 활성화되어 있는지 확인
      expect(loginButton).toBeEnabled();
    });
  });

  describe("유효성 검사", () => {
    test("이메일 잘못 입력 시 에러 메시지 표시", () => {
      // 잘못된 이메일 입력
      fireEvent.change(emailInput, { target: { value: "invalid-email" } });

      // 에러 메시지 확인
      const emailErrorMessage =
        screen.getByText("올바른 이메일 형식이 아닙니다.");
      expect(emailErrorMessage).toBeInTheDocument();
    });
    test("비밀번호 6자 미만 입력 시 에러 메시지 표시", () => {
      // 잘못된 비밀번호 입력
      fireEvent.change(passwordInput, { target: { value: "12345" } });

      // 에러 메시지 확인
      const passwordErrorMessage = screen.getByText(
        "비밀번호는 6자 이상이어야 합니다."
      );
      expect(passwordErrorMessage).toBeInTheDocument();
    });
    test("제대로 된 이메일 입력 시 에러 메세지 사라짐", () => {
      // 1. 잘못된 이메일 입력 후 에러 메세지 나오는지 확인
      fireEvent.change(emailInput, { target: { value: "invalid-email" } });
      const errorMessage = screen.getByText("올바른 이메일 형식이 아닙니다.");
      expect(errorMessage).toBeInTheDocument();

      // 2. 올바른 이메일 입력 후 에러 메세지 사라지는지 확인
      fireEvent.change(emailInput, { target: { value: "test@test.com" } });
      expect(errorMessage).not.toBeInTheDocument();

      /* ... */
    });
  });

  describe("로그인 요청 테스트", () => {
    test("로그인 성공 시 '로그인 성공' 모달창이 나타나는지 확인", async () => {
      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue({ message: "로그인 성공" }),
      });

      // 이메일과 비밀번호 입력
      fireEvent.change(emailInput, { target: { value: "test@test.com" } });
      fireEvent.change(passwordInput, { target: { value: "123456" } });

      // 로그인 버튼 클릭
      fireEvent.click(loginButton);

      // 모달창이 나타나는지 확인
      const modal = await screen.findByText("로그인 성공");
      expect(modal).toBeInTheDocument();
    });
  });
});
