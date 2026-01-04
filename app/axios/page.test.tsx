import { render, screen } from "@testing-library/react";
import axios from "axios";
import Home from "./page";

jest.mock("axios", () => {
  return {
    get: jest.fn().mockResolvedValue({
      data: [
        {
          id: 1,
          title: "json-server",
          body: "json-server is a simple way to create a REST API with JSON data.",
        },
      ],
    }),
  };
});
describe("axios 모듈 모킹 테스트", () => {
  test("게시물 조회가 잘 되는지 확인", async () => {
    // const mockedAxios = jest.mocked(axios);
    // mockedAxios.get.mockResolvedValueOnce({
    //   data: [
    //     {
    //       id: 1,
    //       title: "json-server",
    //       body: "json-server is a simple way to create a REST API with JSON data.",
    //     },
    //   ],
    // });

    render(<Home />);

    const items = await screen.findAllByRole("listitem");
    expect(items).toHaveLength(1);
  });
});
