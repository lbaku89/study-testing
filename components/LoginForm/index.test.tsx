import { fireEvent, render, screen } from "@testing-library/react";
import { LoginForm } from "./index";

test("로그인 폼이 올바르게 렌더링 되는지 확인", () => {
  render(<LoginForm />);

  // 라벨로 입력(Input) 요소 찾기
  const emailByLabel = screen.getByLabelText("이메일");

  // 플레이스 홀더로 입력 요소 찾기
  const emailByPlaceholder = screen.getByPlaceholderText("이메일을 입력하세요");

  // 역할로 버튼 찾기
  const emailByRole = screen.getByRole("textbox");

  // 테스트 ID로 요소 찾기
  // const emailByTestId = screen.getByTestId("email-input");

  // 모든 요소가 화면에 있는지 확인
  expect(emailByLabel).toBeInTheDocument();
  expect(emailByPlaceholder).toBeInTheDocument();
  expect(emailByRole).toBeInTheDocument();
  // expect(emailByTestId).toBeInTheDocument();

  // emailByLabel, emailByPlaceholder, emailByTestId가 동일한 요소인지 확인
  expect(emailByLabel).toBe(emailByPlaceholder);
  // expect(emailByLabel).toBe(emailByTestId);
});

test("로그인 폼의 이메일과 비밀번호 미입력 시 로그인 버튼 비활성화되는지 확인", () => {
  render(<LoginForm />);

  const emailInput = screen.getByLabelText("이메일");
  const passwordInput = screen.getByLabelText("비밀번호");
  const loginButton = screen.getByRole("button", { name: "로그인" });

  expect(emailInput).toHaveValue("");
  expect(passwordInput).toHaveValue("");
  // expect(loginButton).toBeDisabled()

  expect(loginButton).toBeDisabled();
});

test("이메일, 비밀번호 입력 시 로그인 버튼 활성화되는지 확인", () => {
  render(<LoginForm />);

  const emailInput = screen.getByLabelText("이메일");
  const passwordInput = screen.getByLabelText("비밀번호");
  const loginButton = screen.getByRole("button", { name: "로그인" });

  // 이메일과 비밀번호 입력
  fireEvent.change(emailInput, { target: { value: "test@test.com" } });
  fireEvent.change(passwordInput, { target: { value: "test" } });

  // 로그인 버튼이 활성화되었는지 확인
  expect(loginButton).toBeEnabled();
});

test('이메일 잘못 입력 시 "올바른 이메일 형식이 아닙니다." 라는 에러 메시지가 표시되는지 확인', () => {
  render(<LoginForm />);

  const emailInput = screen.getByLabelText("이메일");

  // 잘못된 이메일 입력
  fireEvent.change(emailInput, { target: { value: "invalid-email" } });

  // 에러 메시지 확인
  const emailErrorMessage = screen.getByText("올바른 이메일 형식이 아닙니다.");
  expect(emailErrorMessage).toBeInTheDocument();
});

test('비밀번호 6자 미만 입력 시 "비밀번호는 6자 이상이어야 합니다." 라는 에러 메시지가 표시되는지 확인', () => {
  render(<LoginForm />);

  const passwordInput = screen.getByLabelText("비밀번호");

  // 잘못된 비밀번호 입력
  fireEvent.change(passwordInput, { target: { value: "12345" } });

  // 에러 메시지 확인
  const passwordErrorMessage = screen.getByText(
    "비밀번호는 6자 이상이어야 합니다."
  );
  expect(passwordErrorMessage).toBeInTheDocument();
});

test("제대로 된 이메일 입력 시 에러 메세지가 사라지는 확인", () => {
  render(<LoginForm />);

  const emailInput = screen.getByLabelText("이메일");
  // const passwordInput = screen.getByLabelText("비밀번호");

  // 1. 잘못된 이메일 입력 후 에러 메세지 나오는지 확인
  fireEvent.change(emailInput, { target: { value: "invalid-email" } });
  const errorMessage = screen.getByText("올바른 이메일 형식이 아닙니다.");
  expect(errorMessage).toBeInTheDocument();

  // 2. 올바른 이메일 입력 후 에러 메세지 사라지는지 확인
  fireEvent.change(emailInput, { target: { value: "test@test.com" } });
  expect(errorMessage).not.toBeInTheDocument();
});
