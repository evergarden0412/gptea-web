# GPTea


## 1️⃣ 프로젝트 소개

### 1-1. 개요

GPT API를 이용하여 챗봇과 대화할 수 있는 메신저 웹앱입니다. 메시지를 스크랩하고, 스크랩 된 메시지들을 스크랩북 별로 조회 가능합니다. 해당 항목에서 바로 본문으로 이동할 수 있습니다.


### 1-2. member
FE 🧑🏻‍💼 Jeongwon Lee  
https://github.com/hahagarden  

BE 🧑🏻‍💼 Hankyeol Kyung  
https://github.com/keenranger  

### 배포 주소
https://gptea-test.keenranger.dev  
ChatGPT 접속량 증가 등으로 서비스 이용이 불가할 때에도 GPTea 서비스는 이용하실 수 있습니다.

### 1-3. 기술 스택

`React` `TypeScript` `Redux-Toolkit` `styled-components` `Figma`


### 1-4. 프로젝트를 통해 배운점

- 프로젝트 기획, Figma 와이어프레임, 프로토타이핑 단계를 모두 수행하며 이 단계가 어렵지만 실제 구현이 훨씬 빨라지고 수월해진다는 것을 배웠습니다.
- 백엔드와 프론트엔드로 나누어 협업한 첫 번째 팀 프로젝트로, 작업을 상의하고 요구하고 설명하는 방법 등 협업을 연습했습니다.


### 1-5. 폴더 구조
```
src
 ┣ api # api 요청 함수
 ┃ ┣ gptea.ts
 ┃ ┣ gpteaAuth.ts
 ┃ ┗ social.ts
 ┣ asset # 이미지 파일
 ┃ ┣ chats.gif
 ┃ ┣ kakao_login_logo.png
 ┃ ┗ scraps.gif
 ┣ components # 리액트 컴포넌트
 ┃ ┣ ChatItem.tsx
 ┃ ┣ ChatItemModal.tsx
 ┃ ┣ Feature.tsx
 ┃ ┣ Loading.tsx
 ┃ ┣ Message.tsx
 ┃ ┣ Messages.tsx
 ┃ ┣ Nav.tsx
 ┃ ┣ NewScrapbook.tsx
 ┃ ┣ Prompt.tsx
 ┃ ┣ Scrap.tsx
 ┃ ┣ ScrapModal.tsx
 ┃ ┣ Scrapbook.tsx
 ┃ ┣ ScrapbookDropbox.tsx
 ┃ ┣ ScrapbookModal.tsx
 ┃ ┗ WithdrawalModal.tsx
 ┣ pages # 라우터
 ┃ ┣ Chat.tsx
 ┃ ┣ Chats.tsx
 ┃ ┣ KakaoLogin.tsx
 ┃ ┣ Login.tsx
 ┃ ┣ MyGptea.tsx
 ┃ ┣ NaverLogin.tsx
 ┃ ┣ Scrapbooks.tsx
 ┃ ┗ Scraps.tsx
 ┣ redux # 상태관리
 ┃ ┣ hooks.ts
 ┃ ┣ isLoggedInSlice.ts
 ┃ ┣ isOpenChatItemModalSlice.ts
 ┃ ┣ isOpenScrapModalSlice.ts
 ┃ ┣ isOpenScrapbookModalSlice.ts
 ┃ ┣ isOpenWithdrawalModalSlice.ts
 ┃ ┣ requestGetChatsSlice.ts
 ┃ ┣ requestGetMessagesSlice.ts
 ┃ ┣ requestGetScrapbooksSlice.ts
 ┃ ┗ store.ts
 ┣ utils # 인터페이스, 상수, 유틸함수 등 유틸 관련
 ┃ ┣ interfaces.ts
 ┃ ┣ toasts.ts
 ┃ ┗ util.ts
 ┣ App.tsx
 ┣ index.css
 ┣ index.tsx
 ┗ setupProxy.js
```


### 1-6. Figma 와이어프레임과 프로토타입
https://www.figma.com/proto/Hy9deg0PnnTrf90nye1pOV/gptea?node-id=112-772&starting-point-node-id=112%3A772

<img src='https://github.com/evergarden0412/gptea-web/assets/88613455/751da3ac-6291-42d8-ae88-3b479354af07' width='600px' />
<img src='https://github.com/evergarden0412/gptea-web/assets/88613455/0501f143-b014-4d43-b9fa-1308f5d85ad2' width='400px'/>

와이어프레임을 제작하여 React 라우팅과 컴포넌트 구조와 네이밍을 설계했습니다.
프로토타입을 제작하여 앱의 흐름과 스타일링, 인터랙션을 설계했습니다.


### 1-7. 프로젝트 실행화면

### - **AI 답변**

<img src='https://github.com/evergarden0412/gptea-web/assets/88613455/4c410056-ac52-43f3-9175-5b072530fa33' width='800px' />

채팅방을 만들고 이름을 설정하여 주제별로 관리할 수 있습니다.

### - Scrapbook 및 Scrap 기능

<img src='https://github.com/evergarden0412/gptea-web/assets/88613455/e4e9ee2f-8eb9-4d9c-b4a3-0d656efd09d9' width='800px' />

- 스크랩을 스크랩북 별로 나누어 저장할 수 있습니다.
- 저장하고 싶은 메세지는 질문과 답변 모두 Scrap 가능합니다.
- Scrap목록을 조회할 수 있고 추가로 다른 스크랩북에 추가하거나 삭제할 수 있습니다.
- 해당 메세지가 있는 채팅 본문으로 이동할 수 있습니다.


<br />

## 2️⃣ 핵심 기능

### 2-1. **소셜로그인 및 GPTea JWT 인증**

- Kakao와 Naver API를 통해 소셜로그인을 하면 GPTea API로 JWT발급
- localStorage에 저장된 GPTea 토큰으로 자동로그인 가능
- 로그아웃, 계정삭제 시 소셜로그인도 함께 API 요청

### 2-2. **서버데이터 동기화**

<img src='https://github.com/evergarden0412/gptea-web/assets/88613455/dba719a0-a526-470f-9328-266d5a289d55' width='800px'/>

- 챗, 메시지, 스크랩북, 스크랩 등 CRUD가 발생하면 Redux의 createAsyncThunk 함수로 비동기 액션생성자를 생성하여 최신 서버데이터 동기화
  
### 2-3. **스크랩 로직**

- 스크랩 신규 추가할 때 scrapID 생성
- 생성된 scrapID로 다른 스크랩북으로 옮기거나 추가하거나 제거
- 삭제 기능으로 모든 스크랩북에서 해당 스크랩 삭제

### 2-4. **모바일 반응형 디자인**

<img width="300" alt="menu" src="https://github.com/evergarden0412/gptea-web/assets/88613455/80c11336-608a-4fb3-ba3f-a4d7b4315ae7">
<img width="300" alt="chats" src="https://github.com/evergarden0412/gptea-web/assets/88613455/4f3b6edb-6b31-4824-a94f-5ddfd0daa5e0">
<img width="300" alt="chat" src="https://github.com/evergarden0412/gptea-web/assets/88613455/470afe60-5868-4f47-ab38-02ef8f22c7b1">
<img width="300" alt="scrap" src="https://github.com/evergarden0412/gptea-web/assets/88613455/ad25cd92-ea6f-4288-bc96-202309a81fa0">

- 모바일 반응형 디자인 적용
