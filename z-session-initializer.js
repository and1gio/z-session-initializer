'use strict';

module.exports = {
    run: function (app, next) {
        var session = require('express-session');
        var ZSessionServerClient = require('z-session-server-client')(session);

        var sessionConfig = {
            store: new ZSessionServerClient({
                host: app.config.zSessionServerClient.host,
                port: app.config.zSessionServerClient.port,
                path: app.config.zSessionServerClient.path
            })
        };

        if(app.config.zSessionServerClient.secret !== undefined){
            sessionConfig.secret = app.config.zSessionServerClient.secret;
        }

        if(app.config.zSessionServerClient.resave !== undefined){
            sessionConfig.resave = app.config.zSessionServerClient.resave;
        }

        if(app.config.zSessionServerClient.saveUninitialized !== undefined){
            sessionConfig.saveUninitialized = app.config.zSessionServerClient.saveUninitialized;
        }

        if(app.config.zSessionServerClient.cookie !== undefined){
            sessionConfig.cookie = app.config.zSessionServerClient.cookie;
        }

        if(app.config.zSessionServerClient.domain !== undefined){
            sessionConfig.domain = app.config.zSessionServerClient.domain;
        }

        app.express.use(session(sessionConfig));

        next();
    }
};
