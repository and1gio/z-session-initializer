'use strict';

module.exports = {
    run: (app, next) => {
        const session = require('express-session');
        const MongoStore = require('connect-mongo')(session);

        app.express.use(session({
            resave: zSession.resave,
            saveUninitialized: zSession.saveUninitialized,
            secret: app.config.zSession.secret,
            store: new MongoStore(app.config.zSession.store)
        }));

        next();
    }
};
