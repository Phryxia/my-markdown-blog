# 쿠키(Cookie)

**쿠키(Cookie)**는 서버에서 브라우저로 저장하는 작은 데이터 조각이다. 저장된 쿠키는 이후 같은 사이트를 이용할 때 서버로 전송된다.

쿠키를 이용하는 전형적인 시나리오로 자동 로그인이 있다. HTTP 통신 자체는 비상태적(Stateless)이기 때문에, 서버가 클라이언트의 상태를 식별하기 위해서 정보를 획득할 필요가 있다. 이 역할을 쿠키가 한다.

모던 웹 개발에서는 쿠키 대신 `localStorage`나 `sessionStorage 사용을 권장하고 있다. 쿠키는 세션이 유지되는 동안, 서버로 요청을 보낼 때 마다 전송되는 반면 후자는 그렇지 않기 때문이다.



## 쿠키 주고받기

기본적으로 쿠키는 서버에서 브라우저에게 생성하라고 요청할 수 있다. 이는 HTTP 헤더를 통해서 설정할 수 있다.

가령 google.com을 검색창에 치면(=GET 요청을 날리면), 구글 서버가 브라우저에 이런 응답을 보내는 것을 확인할 수 있다.

```
set-cookie: __Secure-3PSIDCC=AJi4QfFrx0TmwvOWg5xw7WcYaApbcTe3eDY6PPz5okzYer7pws1zkoYk1_EEKM64x-OppkyVgmA; expires=Fri, 11-Feb-2022 12:16:22 GMT; path=/; domain=.google.com; Secure; HttpOnly; priority=high; SameSite=none
```

이렇게 `set-cookie: key=value;` 형식의 헤더를 서버가 보내면, 브라우저는 자체적으로 쿠키를 저장해둔다.

그 후 구글에 다른 요청을 보낼 때(ex: 구글 로고 이미지 다운로드 요청) HTTP 헤더를 까보면, 저장된 쿠키를 보내는 부분을 볼 수 있다.

```
cookie: SEARCH_SAMESITE=CgQI5JAB; ANID=OPT_OUT; OGPC=19020770-1:; OGP=-19020770:; HSID=A0kNmtx1yeAePbjI5; SSID=AeTbS1F1E0uFbNHL_; APISID=qcPdF7I0_OcTtgjX/ASNb3HaU6mesmHNmM; SAPISID=7OhNvcM5rUq9PfHF/A9-plHit6BxODaTa-; (생략)
```



## 쿠키의 성질

쿠키는 크게 2종류로 나뉜다.

- 세션 쿠키: 현재 세션이 종료되면 자동으로 삭제
- 영속 쿠키: `Expires` 속성에 명시된 날짜에 삭제 또는 `Max-Age` 속성에 명시된 시간 이후 삭제

이때 날짜의 기준은 서버 시간이 아닌 브라우저 시간에서 결정된다.

예컨데 아래 쿠키는 브라우저에 저장된 이후 1시간 동안 생존한다.

```
Set-Cookie: id=babo; Max-Age=3600;
```



## JavaScript로 쿠키 건드리기

기본적으로 쿠키는 서버에서 설정을 요청하지만, JavaScript가 실행될 때 쿠키를 설정할 수도 있다.

```javascript
const currentCookie = document.cookie;
```

