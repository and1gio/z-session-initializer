# z-session-initializer

### config/z-session.js
```js
exports.default = function (app) {
    return {
        zSession: {
            secret: 'TheAppSecret',
            resave: true,
            saveUninitialized: false,
            store: {
                url: 'mongodb://192.168.1.183:27017/msda-sessions-store-development',
                ttl: 14 * 24 * 3600, // = 14 days. Default
                stringify: false
            }
        }
    }
};
```