import { render, screen, waitFor } from "@testing-library/react";
import Home from "./page";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const renderWithQueryProvider = (children: React.ReactNode) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        gcTime: Infinity, // Jest 환경에서 타이머 생성 방지
        retry: false, // 테스트에서 재시도 비활성화
      },
    },
  });
  return render(
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe("메인 페이지 테스트", () => {
  test("로딩 상태가 올바르게 표시되는지 확인", () => {
    renderWithQueryProvider(<Home />);

    const loadingText = screen.getByText("Loading...");
    expect(loadingText).toBeInTheDocument();
  });

  test("데이터가 성공적으로 로드되고 표시되는지 확인", async () => {
    // 실제 API 호출 방지를 위한 모킹
    // 모킹을 하지 않으면 어떻게 서버를 켜야만 테스트가 동작합니다.

    const mockedPosts = [
      { id: 1, title: "테스트 제목", body: "테스트 본문" },
      { id: 2, title: "두번째 제목", body: "두번째 본문" },
    ];

    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(mockedPosts),
    });

    renderWithQueryProvider(<Home />);

    await waitFor(() => {
      // li 요소가 올바르게 렌더링되었는지 확인
      const listElements = screen.getAllByRole("listitem");
      // li 요소의 개수가 mockedPosts의 데이터 개수와 일치하는지 확인
      expect(listElements).toHaveLength(mockedPosts.length);
      // 각 포스트의 제목이 올바르게 표시되는지 확인
      expect(screen.getByText("1: 테스트 제목")).toBeInTheDocument();
      expect(screen.getByText("2: 두번째 제목")).toBeInTheDocument();
    });
  });

  test("API 호출 실패 시 에러 상태가 올바르게 표시되는지 확인", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
    });

    renderWithQueryProvider(<Home />);

    await waitFor(() => {
      expect(
        screen.getByText("서버에서 데이터를 가져오는 데 실패했습니다.")
      ).toBeInTheDocument();
    });
  });
});
