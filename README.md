# Nest 맛보기

## Nest 란

- Node 에서 express 하나만으로는 구조적인 백엔드를 만드는 게 힘들어서 프레임워크를 써서 편하게 만들도록 한 것
- 타입스크립트가 기본적으로 탑재되어있고, class 와 데코레이터를 써서 사용한다

## App 모듈이란

- Nest 를 사용하기 위한 가장 기본적인 앱이다
- 인증, 사진 등의 모듈을 만들려면 만든 후 여기에 넣으면 된다

## controller 란

- 라우팅을 해 주는 역할이다
- 그냥 Get, Post 등의 요청을 받고, 함수를 리턴만 해 준다

## service 란

- 실제 비즈니스 로직이 있는 곳이다
- DB 호출 등의 로직은 이 곳에 있어야 한다

## DTO 란

- 데이터 전송 객체(Data Transfer Object)이다.
- 실제 데이터를 주고받을 때 사용하는 포맷을 정의하는 객체이다.
- NestJS에서는 이 DTO를 통해 `class-validator`를 사용하여 클라이언트가 보내는 Body 값을 더 엄격하게 검사할 수 있다.
- DTO를 인터페이스가 아닌 클래스로 정의하는 이유는 데코레이터를 사용할 수 있기 때문이다.
  - 예를 들어, `@IsString()`과 같은 데코레이터를 각 필드에 적용하여 런타임에서 타입 체크와 유효성 검사가 가능해진다.
- NestJS의 `ValidationPipe`를 사용하여 유효성 검사를 수행할 수 있는 미들웨어 역할을 추가할 수 있다.

## ValidationPipe 란

- 기본적으로 DTO의 각 필드를 타입과 유효성 검사해 준다.
- 주요 옵션:
  - whitelist: DTO에 명시된 필드만 허용한다.
  - forbidNonWhitelisted: whitelist에 없는 필드가 Body로 들어왔을 경우 에러를 발생시킨다.
  - transform: 요청에서 받은 데이터를 DTO에 명시된 타입으로 자동 변환해준다 (예: 쿼리 스트링으로 받은 값을 string에서 number로 변환).

## 모듈이란

- nest 는 여러개의 모듈로 이루어져있다.
- App 은 루트 경로에 뭔가를 해야 할 때 사용한다. (controller 에서 '/' 라우트를 지정할 수 있음)
- 모듈에서 provider 에 service 를 넣어줘야 controller 에서 해당 service 를 사용할 수 있게 된다.  
nest 에서 알아서 전부 import 를 해 준다고 보면 된다.
- 예를 들어서 원래라면

```ts
const service = new MovieService()
const controller = new MovieController(service)
```

- 이런 식으로 수동으로 서비스 인스턴스를 만들고 컨트롤러에 주입해야 하는데,  
module 이라는 컨테이너를 만들고 각각을 controller, providers 에 등록해 주면 nest 에서 알아서 의존성 주입을 해 준다

### 참고

1. 컨트롤러를 사용할 땐 nest cli 를 사용하는 것이 편하다
   1. 예) nest generate controller
2. 컨트롤러를 만들면 해당 경로가 엔드포인트로 된다
   1. 예) movies 컨트롤러 >> /movies 엔드포인트로 시작
3. 뭔가 필요하다면 요청을 하면 된다
   1. 예) 파라미터가 필요하다면 @Param 으로 요청하면 됨  

```ts
@Get('/:id')
// 이런 식으로 @Param 을 써서 id 파라미터를 요청한 다음 받아올 변수로 받아오면 된다
getOne(@Param('id') movieId: string) {
return `This will return on movie with the id: ${movieId}`;
}
```

4. json 을 리턴하고 싶다면 그냥 Json 타입을 리턴하면 된다
   1. express 에서는 JSON.parse 이런 식으로 json 으로 파싱해야 하는데, nest 는 알아서 해줌
5. :id 이런 다이나믹 라우팅이랑 정적 라우팅이랑 겹치면 무조건 :id 로 갈 수가 있음
   1. 예) :id 와 /search 가 같이 있으면 /search 로 접근할 경우 id 가 search 인 것으로 판단해 버림
   2. 이럴 땐 search 메소드를 :id 보다 위에서 선언해 주면 됨
      1. 약간 React Route 랑 비슷한 것 같음.
6. 컨트롤러에서는 서비스 의존성을 주입 받는다
   1. 왜냐하면 서비스 로직을 분리시키기 위해서
   2. 주입을 받고 서비스 로직의 메서드들을 사용할 수 있게끔 한다

## 번외

- Nest 에서는 기본적으로 class 를 사용해서 클래스에 대해 정리해 보려고 한다

1. 클래스는 인스턴스를 생성하기 위한 도구이다.
2. private은 다른 클래스에서 접근하지 못하도록 막는 것이다.
3. readonly는 클래스 내부와 외부에서 모두 수정을 못하도록 막는 것이다.
4. constructor는 없어도 되지만, 객체를 쉽게 만들 수 있게 해주는 도구이다.
   1. 인스턴스를 생성해 주는 역할을 한다.
   2. 그리고 의존성 주입을 가능하게 해준다.
      1. 의존성 주입은 클래스를 확장성 있게 만들어 줌
5. 의존성 주입을 통해 서비스 로직을 분리하면 더 편리하다.
   1. 서비스 로직을 분리하면 관심사의 분리를 할 수 있다.
   2. 이렇게 하면 유지보수가 쉬워진다.
   3. 테스트를 하기가 더 쉬워진다.