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
