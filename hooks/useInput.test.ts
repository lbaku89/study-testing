import { renderHook, act } from "@testing-library/react";
import { useInputs } from "./useInput";

const INITIAL_VALUES = {
  email: "123",
  password: "123456",
};
describe("useInputs 훅 테스트", () => {
  test("초기값이 올바르게 생성되는지 확인하기", () => {
    // 컴포넌트를 그릴 땐 render를 사용했습니다.
    // 하지만 커스텀 훅을 독립적으로 테스트할 땐 renderHook을 사용합니다.

    const { result } = renderHook(() => {
      return useInputs({ name: "", nickname: "" });
    });

    expect(result.current.values).toEqual({
      name: "",
      nickname: "",
    });
  });

  test("handleChange 함수가 입력값을 변경하는지 확인하기", () => {
    const { result } = renderHook(() => {
      return useInputs({ name: "", nickname: "" });
    });

    const mockEvent = {
      target: { name: "name", value: "김철수" },
    } as React.ChangeEvent<HTMLInputElement>;

    act(() => {
      result.current.handleChange(mockEvent);
    });

    expect(result.current.values.name).toBe("김철수");
  });

  test("handleChange 함수로 여러 값을 업데이트할 때 올바르게 작동하는지 확인", () => {
    const { result } = renderHook(() => {
      return useInputs({ name: "", nickname: "" });
    });

    // 초기화 제대로 되었는지 확인
    expect(result.current.values).toEqual({
      name: "",
      nickname: "",
    });

    const nameUpdateEvent = {
      target: { name: "name", value: "김철수" },
    } as React.ChangeEvent<HTMLInputElement>;

    const nicknameUpdateEvent = {
      target: { name: "nickname", value: "철수" },
    } as React.ChangeEvent<HTMLInputElement>;
    act(() => {
      result.current.handleChange(nameUpdateEvent);
      result.current.handleChange(nicknameUpdateEvent);
    });

    expect(result.current.values).toEqual({
      name: "김철수",
      nickname: "철수",
    });
  });

  test("handleDelete를 통해 특정필드가 올바르게 삭제되는지 확인하기", () => {
    const { result } = renderHook(() => {
      return useInputs({ name: "김철수", nickname: "" });
    });

    act(() => {
      result.current.handleDelete("name");
    });

    expect(result.current.values.nickname).toBe("");
    expect(result.current.values.name).toBe("");
  });
});
