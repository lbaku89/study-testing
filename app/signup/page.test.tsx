import { render, screen, fireEvent } from "@testing-library/react";
import SignupPage from "./page";
import { useRouter } from "next/navigation";

jest.mock("next/navigation");

// jest.mock("next/navigation", () => {
//   return {
//     useRouter: () => ({
//       push: jest.fn(),
//     }),
//   };
// });

test("회원가입 성공 후 login 페이지로 이동되는 로직이 실행되는지 확인", () => {
  // (useRouter as jest.Mock).mockReturnValue({
  //   push: jest.fn(),
  // });
  // useRouter = jest.fn()
  const pushMock = jest.fn();
  (useRouter as jest.Mock).mockReturnValue({
    push: pushMock,
  });

  render(<SignupPage />);

  const emailInput = screen.getByLabelText("이메일");
  const passwordInput = screen.getByLabelText("비밀번호");
  const passwordConfirmInput = screen.getByLabelText("비밀번호 확인");
  const signupButton = screen.getByRole("button", { name: "회원가입" });

  fireEvent.change(emailInput, { target: { value: "test@test.com" } });
  fireEvent.change(passwordInput, { target: { value: "123456" } });
  fireEvent.change(passwordConfirmInput, { target: { value: "123456" } });
  fireEvent.click(signupButton);

  expect(pushMock).toHaveBeenCalledWith("/login");
  // expect(window.location.pathname).toBe("/login");
});
