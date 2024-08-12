const express = require('express');
const router = express.Router();
const { setToken, authenticateJWT } = require('../services/auth');
const myEventEmitter = require('../services/logEvents.js');
const pDal = require('../services/p.fulltext.dal');
const mDal = require('../services/m.fulltext.dal');
const app = require('../index.js');

// Use the setToken middleware to set the JWT token from the session.
router.use(setToken);

// Protect all API routes with the authenticateJWT middleware.
router.use(authenticateJWT);

// Route: GET /search - Display the search page.
router.get('/', async (req, res) => {
    const theResults = [];
    myEventEmitter.emit('event', 'app.get /search', 'INFO', 'Search page (search.ejs) was displayed.');
    res.render('search', { status: req.session.status, theResults });
});

// Route: POST /search - Handle search requests.
router.post('/', async (req, res) => {
    const { keyword, database } = req.body;
    let theResults = [];

    if (database === 'mongo') {
        theResults = await mDal.getFullText(keyword);
    } else if (database === 'postgres') {
        theResults = await pDal.getFullText(keyword);
    }

    myEventEmitter.emit('event', 'app.post /search', 'INFO', `Search page (search.ejs) was displayed with search term: ${keyword}.`);
    res.render('search', { status: req.session.status, theResults });
});

// Route: POST /search - Handle search requests (duplicate route, consider removing).
router.post('/search', async (req, res) => {
    const { keyword, database } = req.body;
    let theResults = [];

    if (database === 'mongo') {
        theResults = await mDal.getFullText(keyword);
    } else if (database === 'postgres') {
        theResults = await pDal.getFullText(keyword);
    }

    myEventEmitter.emit('event', 'app.post /search', 'INFO', `Search page (search.ejs) was displayed with search term: ${keyword}.`);
    res.render('search', { status: req.session.status, theResults });
});

module.exports = router;