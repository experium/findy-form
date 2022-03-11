# Index version check

## `<VersionCheck />`

```js
    <VersionCheck>
        {({ needUpdate, update, close }) => needUpdate && (
            <div className='version-check-banner'>
                <CloseOutlined onClick={close} />
                Доступна новая версия сервиса - <b className='update' onClick={update}>обновите страницу</b>
            </div>
        )}
    </VersionCheck>
```

Form components

### Props

- `interval`: minutes to recheck new version (default - 10)
- `indexRoute`: get url for response check (default - 'index.html')

### RenderProps

- `needUpdate`
- `update`
- `close`

## `<Banner />`

```js
    <VersionCheck>
        { props => (
            <Banner {...props}  />
        )}
    </VersionCheck>
```

Default banner with styles and buttons

### Props

- `message`: text message for banner
- `messageUpdate`: text message for update page link
- `closeIcon`: icon component for render close
