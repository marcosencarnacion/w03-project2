const express = require('express');
const boydParser = require('body-parser');
require('dotenv').config();
const passport = require('passport');
const session = require('express-session');
const GitHubStrategy = require('passport-github2').Strategy;
const cors = require('cors');

const mongodb = require('./data/database');
const app = express();

const port = process.env.PORT || 3000;

app.use(boydParser.json());

app
    .use(boydParser.json())
    .use(session({
        secret: 'secrete_cookie',
        resave: false,
        saveUninitialized: true
    }))

    // This is where we initialize passport and the passport session
    .use(passport.initialize())
    .use(passport.session())

    .use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader(
            'Access-Control-Allow-Headers',
            'Origin, X-Requested-With, Content-Type, Accept, Authorization'
        );
        res.setHeader(
            'Access-Control-Allow-Methods', 
            'GET, POST, PUT, PATCH, DELETE, OPTIONS'
        );
        next();
    })
    .use(cors({ methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS']}))
    .use(cors({ origin: '*' }))
    .use('/', require('./routes/index.js'));

    passport.use(new GitHubStrategy({
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: process.env.GITHUB_CALLBACK_URL
    },
    function(accessToken, refreshToken, profile, done) {
        // User authentication logic here
        return done(null, profile);
        //});
    }
));

passport.serializeUser((user, done) => {
        done(null, user);
    });
    passport.deserializeUser((obj, done) => {
        done(null, user);
});

app.get('/', (req, res) => { res.send(req.session.user !== undefined ? `Logged in as ${req.session.user.username}` : 'Not logged in')});

app.get('/github/callback', passport.authenticate('github', { 
    failureRedirect: '/api-docs', session: false }),
    (req, res) => { 
    req.session.user = req.user;
    res.redirect('/');
});


mongodb.initDb((err) => {
    if(err) {
        console.log(err);
    }
    else {
        app.listen(port, () => {console.log(`🚀 Running on port ${port}`)});
    }
});

