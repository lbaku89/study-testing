### 다양한 매처(Matcher) 활용

| 매처                        | 설명                        |
| --------------------------- | --------------------------- |
| toBeInTheDocument()         | 요소가 문서에 있는지        |
| toHaveTextContent('텍스트') | 요소에 특정 텍스트가 있는지 |
| toHaveClass('클레스명')     | 요소에 특정 클래스가 있는지 |
| toHaveClass('클래스명')     | 요소가 비활성화되어 있는지  |
| 요소가 비활성화되어 있는지  | 요소가 비활성화되어 있는지  |

### toBe, toEqual 차이 ?

- toBe > 객체 얕은비교
- toEqual > 객체 깊은 비교

### queryByRole, getByRole 차이 ?

메서드 요소가 있으면 요소가 없으면 주 사용 목적
getByRole 요소 반환 에러 발생 “반드시 있어야 한다” 테스트
queryByRole 요소 반환 null 반환 “있을 수도, 없을 수도 있다” 테스트

### fireEvent

event 발생시키는 함수

## TDD 방식으로 개발하기

**TDD(Test-Driven Development)**란? 테스트를 먼저 작성한 후 그 테스트를 통과하는 코드를 구현하는 개발 방식을 말합니다.

1. ❌ 실패하는 테스트 작성 → 요구사항을 미리 정리한다.
2. ✅ 테스트를 통과하는 최소한의 코드 작성
3. 🔧 코드 개선 사이클로 진행

### toHaveBeenCalled()

콜백함수가 호출되는지만 확인

```tsx
test("X 버튼 클릭 시 onDelete props에 전달된 함수가 호출되는지 확인한다.", () => {
  const onDelete = jest.fn();
  render(<Input value="입력값" onChange={jest.fn()} onDelete={onDelete} />);

  const deleteButton = screen.getByRole("button", { name: "입력값 지우기" });

  // X 버튼 클릭
  fireEvent.click(deleteButton);

  // onDelete 함수가 호출된다.
  expect(onDelete).toHaveBeenCalled();
});
```

아니면 직접 Wrapper 함수 생성 및 적용

```tsx
test("X 버튼 클릭 시 입력값이 지워지는지 확인한다", () => {
  const Wrapper = () => {
    const [value, setValue] = useState("입력값");
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
    };
    const handleDelete = () => {
      setValue("");
    };
    return (
      <Input value={value} onChange={handleChange} onDelete={handleDelete} />
    );
  };

  render(<Wrapper />);

  const deleteButton = screen.getByRole("button", { name: "입력값 지우기" });

  fireEvent.click(deleteButton);

  const input = screen.getByRole("textbox");

  // 입력값이 지워지고
  expect(input).toHaveValue("");

  // X 버튼이 사라진다.
  expect(deleteButton).not.toBeInTheDocument();
});
```

### beforeEach(()=>{})

⚠️ `beforeEach` 이외에도 다음과 같은 것들이 있습니다.

- `afterEach`: 각 테스트 실행 후 수행되는 코드입니다. 주로 테스트 중에 생성된 리소스나 변경된 상태를 정리하는 데 사용됩니다.
  - ex) 테스트 중 생성된 파일을 삭제, 모킹된 함수를 원래 상태로 복원 등
- `beforeAll`: 모든 테스트가 실행되기 전에 한 번만 실행되는 코드입니다. 주로 테스트 환경 설정이나 공통 리소스 초기화에 사용됩니다.
  - ex) 데이터베이스 연결, 테스트 환경 설정, 필요한 모든 테스트를 위한 더미 데이터 생성 등
- `afterAll`: 모든 테스트가 완료된 후 한 번만 실행되는 코드입니다. 주로 테스트 환경을 정리하거나 사용한 리소스를 해제하는 데 사용됩니다.
  - ex) 데이터베이스 연결 종료, 테스트를 위해 생성된 임시 파일 삭제, 모든 목(mock) 함수 초기화 등

참고: https://testing-library.com/docs/react-testing-library/api/#cleanup

→ 리액트 테스팅 라이브러리는 jest 테스트와 함께 사용할 때 기본적으로 각 테스트 후에 **자동으로 렌더링된 컴포넌트를 정리(cleanup)**

## 테스트 구조화하기 - describe

현재 로그인 컴포넌트의 테스트 코드

→ 아래의 테스트 코드가 5개 정도 존재한다. 만약 한 파일에 테스트할 코드가 **2~30개**라면?

→ 테스트 코드가 너무 복잡해지고 가독성이 떨어진다.

→ describe로 구조화 가능

### 모킹 함수의 반환값 지정하기 - `mockResolvedValue`

`mockResolvedValue`는 모킹된 함수가 **Promise를 반환**하도록 하며, 이 Promise는 지정된 값으로 resolve됩니다.

```tsx
jest.fn()**.mockResolvedValue(반환값) // <- 여기에 fetch 함수의 반환값을 넣어야겠네요.**
```

### 리액트가 업데이트 될 때까지 기다리기 - findBy

API 모킹을 한 후에도 **에러가 발생**합니다. 에러의 원인을 살펴보니 **리액트가 업데이트 되기 전에 테스트했다**라고 하네요.

### 📖 정리

1. 순수하게 프론트엔드 부분(사용자 행동에 대한 UI 변화)만 테스트하고 싶다

   → 외부 조건(API 호출)은 제거하고 싶다

   → 모킹을 한다. (`jest.fn()`)

2. `mockResolvedValue`를 통해 모킹한 함수의 반환값을 설정할 수 있다.
3. \*\* **실제 API 호출이 일어나기 전에 모킹**해야 한다. 실제로 일어나기 전에 미리 세팅하는 것이기 때문에!!

## mockRejectedValue로 실패 모킹하기

이전 강의에선 **API 호출이 성공하는 경우**의 프론트엔드 테스트만 살펴봤습니다.

하지만 **실패했을 때도 프론트엔드에선 UI적인 변화 혹은 로직을 처리**해야 합니다. 예를 들어, API 요청 시 서버가 네트워크 문제로 서버가 갑자기 끊긴다면 어떨까요? 이때도 **우리가 원하는대로 동작하는지 테스트**할 필요가 있을 것 같습니다.

### wait for, find By

### toHaveBeenCalled, toHaveBeenCalledWith

### 이미 존재하는 함수를 감시하는 spyOn

즉, fetch의 경우 정의조차 되어 있지 않기 때문에 이미 존재하는 함수가 아닙니다. 즉, jest.fn()은 가능하지만 spy 함수는 사용할 수 없습니다. spy 함수는 “이미 존재하는 함수의 원본 기능을 유지하되 감시만 한다.” 라고 했기 때문입니다.
반면 alert는 jest 내에서 정의는 되어있지만 구현은 되어있지 않습니다. 이전에 봤던 에러 메세지는 다음과 같이 not implemented 라고 하네요. 즉, 존재는 하지만 기능은 없다는 겁니다. spy 함수는 이미 존재하는 함수를 감시하는데 사용할 수 있기 때문에 alert는 spy 함수를 적용할 수 있을 것 같습니다.

beforeEach(() => {
// 각 테스트가 실행되기 전에 mock, spyOn을 초기화한다.
jest.clearAllMocks();
});

## renderHook

## act

그래서 리액트의 상태 업데이트를 동기적으로 처리하도록 강제하는 역할을 하는 act라는 함수를 사용해야 합니다.

## toEqual, toBe

toEqual은 객체나 배열을 비교할 때 사용하며, toBe는 원시 값이나 참조를 비교할 때 사용합니다.

- `waitFor`: \*\*\*\*
  - **비동기 작업이 완료될 때까지 기다리는 함수.** 이 함수는 특정 조건이 충족될 때까지 일정 시간 간격으로 콜백 함수를 재실행. (완료될 때까지의 시간이 불확실할 때)
  - 특히 API 요청처럼 **비동기적으로 상태가 변경**되는 경우, 변경된 상태를 확인하기 위해 waitFor를 사용
- ↔ `act`: 단순한 리액트 상태 업데이트를 강제할 때

## Context API 테스트

사실 Context API 자체를 테스트하는 건 큰 의미가 없습니다.
왜냐하면 Context API는 React의 내장 기능이므로 이미 React 팀에서 테스트를 완료한 후 배포했을 것이기 때문입니다.

그래서 우리는 Context API의 기능을 테스트하기보다 우리가 구현한 로직이 Context API와 함께 올바르게 작동하는지를 테스트할 겁니다.

## 테스트용 QueryProvider 만들기

- retry:false 설정(실패의 경우를 테스트할때 불필요하게 재요청 하는 과정을 제거하여 빠른테스트 환경 만들기)
- gcTime:Infinity 설정 (gcTime 사용시 내부적으로 setTimeout 을 실행함, 따라서 타이머를 생성하지 않아 안정적인 테스트 환경을 제공)

## mutation 테스트

- mockResolvedValueOnce

## jest.clearAllMocks

- jest.clearAllMocks
- mockClear()

## jest.mock(모듈 모킹)

## jest.clearAllMocks(); 는 모든 모킹 함수의 호출 기록을 초기화하는 메소드. 즉 toHaveBeenCalledTimes 등의 호출 정보를 리셋하여 각 테스트가 독립적으로 실행될 수 있도록 합니다.

## 모킹함수.mockClear() 개별 모킹 함수에 대해서만 초기화

- `mockReturnValue`는 일반 함수의 반환값을 설정하는 방법입니다.
- `mockImplementation`은 구현을 대체하거나 가짜 구현을 제공하는 방법입니다.

## mockClear, mockReset, mockRestore

| 기능                    | mockClear            | mockReset            | mockRestore            |
| ----------------------- | -------------------- | -------------------- | ---------------------- |
| 호출 기록 초기화        | O                    | O                    | O                      |
| 모킹된 구현 반환값 제거 | X                    | O                    | O                      |
| 원본 기능 복원          | X                    | X                    | O                      |
| 일괄 적용 메소드        | jest.clearAllMocks() | jest.resetAllMocks() | jest.restoreAllMocks() |

## jest.mock(모듈) , jest.mocked("mocke된 모듈")
