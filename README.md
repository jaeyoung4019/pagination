## Component Call


```ts
  <Pagination
      handlePage={handlePage}
      page={page}
      pageInfo={{
          total: organizationListQuery?.data?.total
      }}
  />

```

### PageHandler
```ts
    const handlePage = useCallback(
        (type: string) => (value: number) => {
            setPage(data => {
                return {
                    ...data,
                    [type]: value
                };
            });
        },
        [page]
    );

```


### Page State

```ts
    const pageInitVariable = {
        page: 1,
        pageSize: defaultPageSize
    };
    const [page, setPage] = useState(pageInitVariable);
```

  
