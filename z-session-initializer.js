'use strict';

module.exports = {
    run: function (app, next) {
        var session = require('express-session');
        var ZSessionServerClient = require('z-session-server-client')(session);

        app.express.use(session({
            store: new ZSessionServerClient({
                host: app.config.zSessionServerClient.host,
                port: app.config.zSessionServerClient.port,
                path: app.config.zSessionServerClient.path
            }),
            secret: app.config.zSessionServerClient.secret,
            resave: app.config.zSessionServerClient.resave || false,
            saveUninitialized: app.config.zSessionServerClient.saveUninitialized || true,
            cookie: app.config.zSessionServerClient.cookie || {secure: false}
        }));

        next();
    }
};
