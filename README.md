# fororo frontend

## 사용 기술 스택

- React
- Typescript
- Next.js
- vite
- swc
- tailwind
- eslint

## Branch Protection 및 브랜치 전략 설명

본 레포지토리는 `main` 브랜치에 대하여 Protection이 설정되어 있어 `main`으로 직접 commit을 push하는 것이 방지되어있습니다.

`main` 브랜치에 수정한 코드를 적용하기 위해서는 할 작업에 대한 issue 작성, Branch 분할 후 작업 및 PR 작성이 필요합니다.

Branch 분할은 터미널에서 다음과 같이 분리 가능합니다.

```
git checkout -b <브랜치명>
```

이때, `<브랜치명>`은 이슈 번호를 3자리로 맨 앞에 적고, 뒤에 영어로 간단히 작업 내용을 설명합니다.

예를 들어, 이 README를 수정하기 위해서는 #1 이슈를 먼저 생성하고, 브랜치를 분리합니다.

```
git checkout -b 001-readme-update
```

이후 작업을 진행한 뒤 원격 레포지토리로 브랜치를 push하면, github 레포지토리의 Pull Requests 탭에 들어가면 상단에 황색 메시지 박스가 뜨면서 `Compare & pull request`를 작성할 수 있습니다. 해당 PR에 대한 내용을 작성한 뒤 1명 이상의 코드 리뷰를 통해 Approve가 되면 비로소 main 브랜치에 작업 내용을 업데이트 할 수 있습니다.

## 개발환경 실행 방법

> node 18.0.0 이상, pnpm 6.14.0 이상이 필요합니다.

```
pnpm run dev
```

빌드는 다음과 같이 하면 됩니다.

```
pnpm run build
```
