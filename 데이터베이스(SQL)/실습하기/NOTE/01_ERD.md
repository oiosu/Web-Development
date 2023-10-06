#### 01_데이터베이스를 시각적으로 볼 수 있는 ERD

* ERD(Entity Relationship Diagram) 확인해보기 

* dbeaver 다운로드 받아 설치하기 

> `https://dbeaver.io/download/`

```sql
CREATE TABLE items (
	id INTEGER PRIMARY KEY, 
	title TEXT NOT NULL,
	image BLOB,
	price INTEGER NOT NULL,
	description TEXT,
	place TEXT NOT NULL
);
```

