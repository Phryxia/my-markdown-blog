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
npm run build
```

새 글은 contents 폴더 밑에 자유롭게 추가한 뒤 다음 명령을 실행합니다. `netlify` 등의 서비스를 사용할 경우 빌드 명령어에 같이 추가해주시면 됩니다.

```
npm run profile
```

