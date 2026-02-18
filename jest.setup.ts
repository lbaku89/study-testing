// DOM 요소를 테스트할 때 매우 유용한 커스텀 매처(matcher)들을 제공
import "@testing-library/jest-dom";

import { server } from "@/mocks/index";

// 모든 테스트가 시작하기 전 MSW 서버를 시작합니다.
beforeAll(() => server.listen());
// 이전 테스트의 모의 응답이 다음 테스트에 영향을 주지 않도록 이전 테스트에서 설정된 핸들러를 초기화합니다.
afterEach(() => server.resetHandlers());
// 모든 테스트가 완료된 후에 MSW 서버를 종료합니다.
afterAll(() => server.close());
