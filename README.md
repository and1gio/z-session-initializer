# z-session-initializer

### app/config/z-session.js
```js
exports.default = function (app) {
    return {
        zSession: {
            secret: 'TheSecret',
            resave: true,
            saveUninitialized: false,
            store: {
                url: 'mongodb://localhost:27017/session-store',
                ttl: 14 * 24 * 3600, // = 14 days. Default
                stringify: false
            }
        }
    }
};
```

### app/config/z-initializer.js
```js
exports.default = function (app) {
    return {
        zInitializer: [
            ...,
            ...,
            { type: 'module', name: 'z-session-initializer', enabled: true },
            ...,
            ...
        ]
    }
};
```
