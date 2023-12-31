# 크리스마스 프로모션

## 구현기능

### 💡 핵심기능

**고객이 이벤트 기간동안 주문에 대해 받을 수 있는 혜택을 안내한다.**

### 💡 상세기능

- [x] 사용자의 방문 일자를 입력받는다.
- [x] 사용자의 메뉴와 개수를 입력받는다.
- [x] 혜택을 표시해준다.
  - [x] 주문 메뉴를 표시한다.
  - [x] 할인 전 주문 총액을 표시한다.
  - [x] 증정 메뉴를 안내한다.
  - [x] 혜택 내역을 안내한다.
    - [x] 크리스마스 할인 금액을 계산한다.
    - [x] 크리스마스 할인 금액을 출력한다.
    - [x] 평일 할인을 계산한다.
    - [x] 평일 할인을 출력한다.
    - [x] 특별 할인을 계산한다.
    - [x] 특별 할인을 출력한다.
    - [x] 증정 이벤트를 확인한다.
    - [x] 증정 이벤트를 출력한다.
  - [x] 총 혜택 금액을 계산한다.
  - [x] 할인 후 결제 금액을 계산한다.
- [x] 혜택에 따른 이벤트 배지를 표시한다.

### 💡 구현 내 검증 관련 내용

- [x] 해당 값이 유효햐지 않은 숫자인가? ( 소수, 문자, 0인지 검증)
- [x] 해당 값이 특정 범위 밖에 있는 숫자인가?
- [x] 지정된 주문 양식과 다른 양식을 가지고 있는가?
- [x] 메뉴판에 없는 메뉴인가?
- [x] 메뉴 수가 유효하지 않은 숫자인가?
- [x] 주문 중 중복된 메뉴가 있는가?
- [x] 총 메뉴 수가 최대 메뉴 수를 초과하는가?
- [x] 음료수로만 주문을 했는가?

### 🤔 추가 구현 기능

```
 미션 문서에서 "꼼꼼하게 확인하고 필요하다면 주어진 문제의 내용을 통해 유추하고 스스로 판단해 구현해 주시면 됩니다." 라는 문장이 있어, 모든 구현을 완료한 후에 이런 기능이 있다면 어떨까 고민해서 추가로 기능을 넣어보았습니다.
```

#### 메뉴판 & 주문 주의 사항 표시

주문 조건 중에 메뉴판에 없는 메뉴로 주문하게 되면 에러를 보여주는데, 주어진 예시 모습에서는 어떤 메뉴가 있는지 알 수 없어 주문에 어려움이 있을 수 있겠다는 생각이 들었습니다. 그리고 요구사항에서 '고객에게 <u>**안내할**</u> 이벤트 주의사항'이라고 되어있기도 했고, 이벤트 특이 사항의 경우 잘못된 입력값이 들어왔을 때, 에러띄워보여주는 것보다 미리 고지해서 에러를 덜 보이게끔하는 것이 더 낫다고 생각했습니다. 그래서 주문 할 때, 메뉴판과 함께 보여주면 주문에 참고할 수 있을 것 같아 함께 표시하는 기능을 추가해보았습니다.

<br/>

## 👨🏻‍💻 신경 썼던 부분

#### < MVC 패턴 >

비즈니스 로직과 UI로직을 분리하기 위해 MVC 패턴을 도입해서 구현해보았습니다.  
요구사항을 파악하면서 먼저 서비스에 필요한 모델을 파악하였습니다.
고객이 입력한 주문에 해당하는 Order와, 방문일을 받아 이벤트 여부를 체크하는 Calendar를 먼저 만들었고, 이후 혜택에서 사용될 Bedge 클래스와 MenuBoard 클래스를 만들었습니다.
뒤에 Bedge와 MenuBoard 클래스는 Order나 Calendar에서 내부적으로 사용하기에는 독립적으로 분리하여 사용할 수 있을 것 같다고 생각했고, 모델 내부에서 파생되어야 하는 데이터들이 있다고 생각하여 따로 클래스를 만들어주었습니다.
그리고 모델 간 관계를 생각하여 Event와 Benefit이라는 컨트롤러를 만들어 주었습니다.

Event 클래스에서는 사용자 입력을 받고, 크리스마스 프로모션의 결과를 보여주기 위한 역할로서 사용하려 했고, Benefit 클래스에서는 Event에서 생성된 인스턴스들로 혜택을 계산하기 위한 역할로서 분리해서 만들어주었습니다.
초기에는 Event 내부에서 혜택을 계산 및 출력하도록 설계했으나 혜택을 계산한다는 것이 어떻게 보면 가장 초기에 설정했던 핵심 기능에 들어맞는 로직인 것 같아 Benefit으로 분리해서 사용하게 되었습니다.

#### < 테스트 코드 >

지난 미션에서는 클래스 내부에서 #(private) 키워드를 적절하게 사용하지 못해서 테스트 코드를 짤 때, Model, Controller 구분 없이 거의 모든 메소드에 대해서 성공/실패 케이스를 따져가며 테스트를 했었습니다.
이번에는 데이터나 메서드를 생성할때 private 키워드를 적절하게 잘 활용하기 위해 노력하다보니 전 미션보다 불필요하거나 다른 메서드에서 태스트 했던 내용을 어려번 하는 케이스를 줄여 보다 적게 테스트 코드를 짤 수 있었습니다.
그 덕분에 핵심적인 Model별 핵심 기능이나 Varificator 메소드들을 테스트 하는 것에 집중할 수 있었습니다.

<br/>

## 🧐 중점적으로 생각했던 것들

```
- 요구사항 파악후 ‘핵심 기능’을 먼저 생각했는가?
- 단일 책임 원리에 따라 함수가 잘 분리되어 있는가?
- 비즈니스 로직과 UI 로직을 분리되어 있는가?
- 데이터 은닉화가 적절하게 이루어 졌는가?
- 테스트 코드가 구현 코드에 영향을 주지 않는가?
```

<br/>

## 📂 각 파일의 역할

### Constants

- `Event.js` : 이벤트 관련 상수를 보관
- `Menu.js` : 메뉴판 데이터를 상수화해서 보관
- `Message.js` : 서비스/에러 메세지를 보관

### Controller

- `Event.js` : 이벤트의 전체적인 흐름을 담당, 입력 및 출력을 담당
- `Benefit.js` : 주문과 방문일에 받을 수 있는 혜택을 종합하고, 혜택에 대한 출력 담당

### Model

- `Bedge.js` : 총 혜택 금액에 따른 뱃지를 받을 수 있도록 뱃지관련 로직 보관
- `Calendar.js` : 해당 일에 받을 수 있는 혜택을 알 수 있도록 날짜 관련 로직 보관
- `MenuBoard.js` : 모든 메뉴, 메뉴 검색 등 주문가능한 메뉴에 대한 로직 보관
- `Order.js` : 사용자가 주문한 메뉴와 수량에 대한 로직 보관

### Util

- `HandleErrorMessage.js` : 에러 메세지에 '[Error]' prefix가 공통으로 붙어서 나갈 수 있도록 하는 유틸 함수
- `HandleException.js` : 사용자가 잘못된 값 입력시 에러를 전달하고, 재 입력 받을 수 있도록 하는 유틸 함수
- `StringHandler.js` : 문자열 분리 유틸 함수
- `VarifiCator.js` : 입력값 검증 함수
- `VarificatorManager.js` : 특정 값에 필요한 검증 로직을 묶어서 관리하기 위해 만든 유틸 함수

### View

- `InputView.js` : 사용자 입력을 받고, 검증 로직을 주입하여 값 검증을 수행하는 로직 보관
- `OutputView.js` : 메세지 출력 로직 보관

<br/>

## 📠 커밋 키워드

```
- feat: 새로운 기능이 추가되는 경우
- fix: 에러를 수정한 경우
- refactor: 리팩토링을 수행한 경우
- test: 테스트 코드 관련 수정사항이 있는 경우
- chore: 기타 부수적인 수정을 하는 경우
- docs: 문서 관련 수정사항이 있는 경우
```
