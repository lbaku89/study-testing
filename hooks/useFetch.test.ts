import { renderHook, waitFor } from "@testing-library/react";
import { useFetch } from "./useFetch";

describe("useFetch 테스트", () => {
  test("데이터를 성공적으로 가져오는지 테스트", async () => {
    const MOCK_DATA = { name: "Test Data" };
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(MOCK_DATA),
    });

    const { result } = renderHook(() => {
      return useFetch<typeof MOCK_DATA>("https://api.example.com/data");
    });

    // 초기 로딩, 데이터, 에러 상태 확인
    expect(result.current.loading).toBe(true);
    expect(result.current.data).toBeNull();
    expect(result.current.error).toBeNull();

    // 데이터 요청 동안 기다리기
    // 로딩이 false면 API 요청이 완료된 것임
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    // 데이터가 올바르게 설정되었는지 확인
    expect(result.current.data).toEqual(MOCK_DATA);
    // 에러가 null인지 확인
    expect(result.current.error).toBeNull();
    // API가 올바른 URL로 호출되었는지 확인
    expect(global.fetch).toHaveBeenCalledWith("https://api.example.com/data");
  });

  test("에러 처리가 정상적으로 작동하는지 테스트", async () => {
    const MOCK_ERROR = "네트워크 응답이 정상적이지 않습니다";
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 404,
    });

    const { result } = renderHook(() => {
      return useFetch("https://api.example.com/data");
    });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toBeNull();
    expect(result.current.error).toBe(MOCK_ERROR);
  });

  test("네트워크 에러 시 error 상태가 업데이트 되는지 확인", async () => {
    global.fetch = jest.fn().mockRejectedValue(new Error("네트워크 에러"));

    const { result } = renderHook(() => {
      return useFetch("https://api.example.com/data");
    });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    expect(result.current.data).toBeNull();
    expect(result.current.error).toBe("네트워크 에러");
  });
});
