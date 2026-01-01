import { math, calculateOrderTotal } from "./math";
test("add 함수의 spyOn 테스트", () => {
  // math.add 함수를 감시하겠다.
  const addSpy = jest.spyOn(math, "add");
  // math.add 함수 호출
  const result = math.add(1, 2);

  // math.add 함수가 1번 호출됐는지 확인
  expect(addSpy).toHaveBeenCalledTimes(1);

  // math.add 함수가 1,2 인수로 호출됐는지 확인
  expect(addSpy).toHaveBeenCalledWith(1, 2);

  // math.add 함수의 반환값이 3인지 확인
  expect(result).toBe(3);
});

beforeEach(() => {
  // 각 테스트가 실행되기 전에 mock, spyOn을 초기화한다.
  jest.clearAllMocks();
});
//응용
test("calculateOrderTotal 함수 실행 시 multiply와 add spy 확인", () => {
  const addSpy = jest.spyOn(math, "add");
  const multiplySpy = jest.spyOn(math, "multiply");

  const mockPrice = 10000;
  const mockQuantity = 2;

  const total = calculateOrderTotal(mockPrice, mockQuantity);

  // multiply가 2번 호출되는지
  expect(multiplySpy).toHaveBeenCalledTimes(2);
  // 첫번째 multiply가 price, quantity로 호출되는지
  expect(multiplySpy).toHaveBeenNthCalledWith(1, mockPrice, mockQuantity);
  // 두번째 multiply가 (price*quantity), 0.9로 호출되는지
  expect(multiplySpy).toHaveBeenNthCalledWith(2, 20000, 0.9);
  // add가 1번 호출되는지
  expect(addSpy).toHaveBeenCalledTimes(1);
  // add가 (price*quantity*0.9), 3500 으로 호출되는지
  expect(addSpy).toHaveBeenCalledWith(18000, 3500);
  // 실제 내부 기능이 온전히 동작하여 결과가 제대로 나오는지
  // ex) (10000 * 2 * 0.9) + 3500 = 21500
  expect(total).toBe(21500);
});
