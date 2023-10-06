### 1. 가져오고 합치기 

##### SQL 생각의 흐름 (SQL Query Execution Order)

* 실습 : `https://www.w3schools.com/sql/trysql.asp?filename=trysql_select_like_not`

> * SELCET : 데이터 가져오기 
> * JOIN : 테이블 연결하기 
> * WHERE : 조건 적용하여 풀을 좁히기 

##### ◼ SELECT * FROM {테이블명}

> 테이블에서 무엇을 가져올 때 쓰는 문법 

```SQL
SELECT * FROM Customer;
```

> Customer 라는 테이블에서 모든 것들을 가져온다. 



##### ◼ JOIN {테이블명1} ON {테이블1.id = 테이블2.id}

> 두 가지의 테이블을 합칠 때 쓰는 문법

```sql
SELECT * FROM Oders JOIN Custormers ON Oders.CustomerId=Customers.CustoerId;
```

> 두 테이블이 어떻게 id를 공유하고 있는지 확인 후 join 하기 
>
> `ON` 어떤 기준으로 테이블을 합칠 것인지 지정 

```sql
SELECT * FROM Oders
JOIN OrderDetails ON Orders.OrderID=OrderDetails.OderID
JOIN Products ON OrderDetails.ProductID=Products.ProductID;
```



##### ◼ WHERE {조건문}

> 가져오는 풀 자체는 좁힌다. 
>
> 특정 조건을 적용해서 필터링하고 싶을 때 쓰는 문법 

```SQL
SELECT ProductName, OrderDate, Quantity, Price FROM Oders
JOIN OrderDetails ON Orders.OrderID=OrderDetails.OderID
JOIN Products ON OrderDetails.ProductID=Products.ProductID;
```

> Quantity가 10보다 큰 것만 가져오기 

```sql
WHERE Quantity > 10;
```

> 또한 Price가 20보다 밑에인 것만 가져오기 

```sql
WHERE Quantity > 10 and Pice < 20;
```



### 2. 그룹화하고 정렬하기 

> * GROUP BY : 그룹화 하기 
> * ORDER BY : 정렬하기 
> * LIMIT : 결과를 제한 



##### ◼ GROUP BY {컬럼명}

> 특정 컬럼(열)을 기준으로 그룹화 
>
> (함께 쓰면 좋은 구문) HAVING : 특정 조건 적용, COUNT : 개수

```SQL
SELECT Country, COUNT(CustomerID) FROM Customers GROUP BY Country;
```

```sql
SELECT Country, COUNT(CustomerID) FROM Customers 
GROUP BY Country HAVING COUNT(CustomerID) > 10;
```

> HAVING은 GROUP BY 뒤에 작성한다. 



##### ◼ ORDER BY {컬럼명}

> 특정 컬럼(열)을 기준으로 정렬 
>
> (정렬기준) ASC : 오름차순, DESC : 내림차순

```SQL
SELECT Country,COUNT(CustomerID) FROM Customers
GROUP BY Country ORDER BY COUNT(CusstomerID) DESC;
```

```SQL
SELECT Country,COUNT(CustomerID) FROM Customers
GROUP BY Country ORDER BY COUNT(CusstomerID) ASC;
```



◼ LIMIT {제한할 개수}

> 데이터 결과 수를 제한 

```SQL
SELECT Country,COUNT(CustomerID) FROM Customers
GROUP BY Country ORDER BY COUNT(CusstomerID) DESC LIMIT 5;
```



