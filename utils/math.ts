export const math = {
  add: (a: number, b: number): number => a + b,
  multiply: (a: number, b: number): number => a * b,
};

export const calculateOrderTotal = (
  price: number,
  quantity: number
): number => {
  // 가격과 수량 계산 결과
  const baseAmount = math.multiply(price, quantity);

  // 할인 적용 후 금앤 (예: 10%할인)
  const afterDiscount = math.multiply(baseAmount, 0.9);

  // 배송비 추가
  const totalWithShipping = math.add(afterDiscount, 3500);

  return totalWithShipping;
};
