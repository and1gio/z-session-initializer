'use strict';

module.exports = {
    run: (app, next) => {
        const mongoose = require('mongoose');
        const passport = require('passport');
        const BearerStrategy = require('passport-http-bearer').Strategy;
        const jwt = require('jsonwebtoken');

        /**
         * schema
         */
        const SessionSchema = mongoose.Schema({
            token: { type: String, required: true, unique: true },
            data: { type: mongoose.Schema.Types.Mixed, required: true },
            createdAt: { type: Date, default: Date.now },
            expiresAt: { type: Date, expires: 1, required: true }
        });

        const connection = mongoose.createConnection(app.config.zSession.store.url);

        connection.on('error', () => {
            app.logger.info('### connection error ###');
            process.exit(1);
        });

        connection.once('open', () => {
            app.logger.info('### connected ###');

            const Session = connection.model('Session', SessionSchema);

            passport.use(new BearerStrategy((accessToken, done) => {
                const expires = new Date(Date.now() + (app.config.zSession.store.ttl || 3600000));

                const findQuery = { token: accessToken };
                const updateQuery = {
                    $set: { expiresAt: expires }
                }

                Session.findOneAndUpdate(findQuery, updateQuery, { new: true }, (err, record) => {
                    if (err) { return done(err); }
                    if (!record) { return done(null, false); }

                    if (app.config.zSession.showLogs) {
                        console.log(record);
                    }

                    return done(null, record, { scope: 'all' });
                });
            }));

            /**
             * zSession
             */
            app.zSession = {
                create: (userData, payload, expiresAt, cb) => {
                    const expires = expiresAt || (new Date(Date.now() + (app.config.zSession.store.ttl || 3600000)));
                    const token = jwt.sign(payload, app.config.zSession.secret);
                    const session = new Session({
                        data: userData,
                        token: token,
                        createdAt: Date.now(),
                        expiresAt: expires
                    });

                    session.save((error) => {
                        cb(error, session);
                    });
                },
                check: passport.authenticate('bearer', { session: false }),
                destroy: (token, cb) => {
                    Session.deleteOne({ token: token }, (error) => {
                        cb(error);
                    });
                }
            };

            next();
        });
    }
};
