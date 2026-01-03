import { render } from "@testing-library/react";
import {
  AuthProvider,
  AuthContext,
  AuthContextType,
} from "@/contexts/AuthContext";
import { ReactElement } from "react";

// 기본 AuthContext 값 정의
const defaultAuthValue: AuthContextType = {
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
};

// 매번 Provider로 감싸주기 귀찮으니 만든 함수
const renderWithAuth = (
  ui: ReactElement,
  authValue?: Partial<AuthContextType>
) => {
  return render(
    authValue ? (
      <AuthContext.Provider value={{ ...defaultAuthValue, ...authValue }}>
        {ui}
      </AuthContext.Provider>
    ) : (
      <AuthProvider>{ui}</AuthProvider>
    )
  );
};

export { renderWithAuth };
