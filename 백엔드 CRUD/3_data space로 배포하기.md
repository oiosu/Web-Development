### 3_data space로 배포하기 

* 메모앱을 정적 웹사이트가 아닌 데이터가 오고가는 동적웹사이트
* 서버 배포가 함께 이루어져아하고 따라서 깃허브 페이지나 netlify로 배포하지 못함 

#####  🤔 Deta Space - The Future of Personal Cloud



(1) `Deta Space` 홈페이지 방문 > 가입 진행 하기 

> Enable Developer Mode 활성화하기 

(2) Setting up the CLI

> `iwr https://deta.space/assets/space-cli.ps1 -useb | iex`
>
> 터미널 > 복붙 > enter
>
> `space login` 입력 

(3) Canvas - Deta Space 

> `access` 검색 > settings 클릭 > `generate token` 버튼 클릭
>
> Your new token 생성 확인 > 토큰 복붙 

(4) `pip freeze > requirements.txt` 

> python 패키지 모두 확인 가능 

(5) `space new` 입력 

> 프로젝트 이름 입력

(6) `space push` 입력

> 배포 성공
>
> 코드 내용 수정 후 `space push` 만 해준다면 수정된 내용 사항 배포됨