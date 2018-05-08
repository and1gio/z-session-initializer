# z-session-initializer

### config/z-session.js
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
