![header](https://capsule-render.vercel.app/api?type=wave&color=FFABAB&height=300&section=header&text=YOUGOD❤️&fontSize=90&fontColor=FFFFFF&animation=fadeIn&stroke=2&strokeColor=FFFFFF)

# 방명록

이 프로젝트는 Next.js를 기반으로 한 웹 애플리케이션으로, 
사용자가 웹 페이지에서 다양한 주제를 작성하고, 편집하며, 공유할 수 있는 기능을 제공합니다.

## 방명록 데모

[방명록 데모](https://nextapp-yougod.vercel.app/)를 통해 프로젝트를 직접 확인할 수 있습니다.


![방명록 프로젝트 미리보기](./public/preview.gif)



## 소개

이 프로젝트는 Next.js와 React를 사용하여 웹 애플리케이션을 구축하였습니다. 
사용자는 게시물을 생성, 수정, 삭제할 수 있으며, 게시물의 내용을 풍부하게 표현할 수 있도록 
React Quill을 사용한 WYSIWYG 에디터가 포함되어 있습니다. 
또한 Tailwind CSS를 사용하여 반응형 디자인을 구현했습니다.

## 주요기능

- **게시물 작성**: 사용자가 Quill 에디터를 통해 새로운 게시물을 작성할 수 있습니다.
- **게시물 읽기**: 작성된 게시물을 읽을 수 있으며, HTML 형식으로 내용을 출력합니다.
- **게시물 수정**: 기존 게시물을 Quill 에디터를 통해 수정할 수 있습니다.
- **게시물 삭제**: 게시물을 삭제하는 기능이 포함되어 있습니다.
- **좋아요 기능**: 사용자는 게시물에 '좋아요'를 누를 수 있으며, 이 기능은 서버와 연동되어 실시간으로 업데이트됩니다.
- **댓글 작성**: 사용자는 게시물에 대해 댓글을 남길 수 있으며, 실시간으로 댓글 목록에 반영됩니다.
- **댓글 삭제**: 사용자는 작성된 댓글을 삭제할 수 있으며, 서버와 동기화되어 삭제된 댓글이 실시간으로 목록에서 제거됩니다.
- **실시간 데이터 새로 고침**: 게시물과 댓글은 주기적으로 서버에서 데이터를 다시 가져와 최신 상태로 유지됩니다.

## 설치 방법

### 필수 조건

- Node.js (v14 이상) 및 npm이 설치되어 있어야 합니다.
- Next.js 및 관련 종속성 설치.

### 프로젝트 클론

먼저, 이 프로젝트를 클론합니다:
```bash
git clone <프로젝트 레포지토리 URL>
cd <프로젝트 디렉토리>
```

# 종속성 설치
프로젝트 디렉토리에서 필요한 종속성을 설치합니다:
```bash
npm install
```

# 환경 변수 설정
`.env.local` 파일을 생성하여 API URL 및 기타 필요한 환경 변수를 설정합니다.
```bash
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

# 개발 서버 실행
```bash
npm run dev
```

## 깃허브 통계 

<div align="center">
  <img src="https://github-readme-stats.vercel.app/api?username=yousincha&show_icons=true&theme=radical" alt="YOUGOD's GitHub stats" />
  <img src="https://github-readme-stats.vercel.app/api/top-langs/?username=yousincha&layout=compact" alt="Top Langs" />
</div>

---
