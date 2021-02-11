# gfnuko::library

**gfnuko::library**는 제가 심심해서 만든 마크다운 기반 블로그입니다. 타입스크립트로 개발하였습니다. 사용한 프레임워크는 다음과 같습니다.

- webpack
- react
- [markdown-it](https://github.com/markdown-it/markdown-it#syntax-highlighting)



## 개발 동기

jekyll 쓰는 법을 배우는게 귀찮아서... 라기보단 바닥부터 블로그를 짜보고 싶었기 때문입니다. 또 언제든지 원하는 기능을 유연하게 추가하고 싶은 의지도 있었습니다.



## 설치

기본적으로 다음과 같이 설치를 하고 소스를 빌드하면 됩니다.

```
npm i
npm run build (또는 build-dev)
```

새 글은 contents 폴더 밑에 자유롭게 추가한 뒤 다음 명령을 실행합니다.

```
npm run profile
```

로컬 테스트를 할 땐 다음의 명령어를 입력한 뒤, 브라우저에서 localhost:8080으로 접속하시면 됩니다. (http-server 설치 필요)

```
npm run boot
```

netlify 등에 배포할 때는 원스탑 명령어로 빌드와 프로파일링을 동시에 합시다.

```
npm run build-and-profile
```

