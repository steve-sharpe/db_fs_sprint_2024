const bcrypt = require('bcrypt');
const uuid = require('uuid');
var router = require('express').Router();
const dal = require('../../services/m.auth.dal');

// Fetch the specific login by id
router.get('/:id', async (req, res) => {
    if(DEBUG) console.log('ROUTE: /api/auth/:id GET ' + req.url);
    try {
        let aLogin = await dal.getLoginById(req.params.id); 
        if (aLogin.length === 0) {
            // Log this error to an error log file
            res.statusCode = 404;
            res.json({message: "Not Found", status: 404});
        } else {
            res.json(aLogin);
        }
    } catch {
        // Log this error to an error log file
        res.statusCode = 503;
        res.json({message: "Service Unavailable", status: 503});
    }
});

// Login route
router.post('/login', async (req, res) => {
    if(DEBUG) console.log('ROUTE: /api/auth/login POST ' + req.url);
    try {
        let aLogin = await dal.getLoginByUsername(req.body.username);
        if (aLogin.length === 0) {
            // Log this error to an error log file
            res.statusCode = 404;
            res.json({message: "Not Found", status: 404});
        } else {
            const match = await bcrypt.compare(req.body.password, aLogin.password);
            if (match) {
                // Successful login, redirect to search
                res.redirect('/search');
            } else {
                res.statusCode = 401;
                res.json({message: "Unauthorized", status: 401});
            }
        }
    } catch (error) {
        // Log this error to an error log file
        res.statusCode = 503;
        res.json({message: "Service Unavailable", status: 503});
    }
});

// Reset the password
router.patch('/:id', async (req, res) => {
    if(DEBUG) console.log('ROUTE: /api/auth PATCH ' + req.params.id);
    try {
        let aLogin = await dal.getLoginById(req.params.id); 
        if (aLogin.length === 0) {
            // Log this error to an error log file
            res.statusCode = 404;
            res.json({message: "Not Found", status: 404});
        } else {  
            try {
                const hashedPassword = await bcrypt.hash(req.body.password, 10);
                await dal.patchLogin(req.params.id, aLogin.username, hashedPassword, aLogin.email);
                res.statusCode = 200;
                res.json({message: "OK", status: 200});
            } catch (error) {
                // Log this error to an error log file
                res.statusCode = 500;
                res.json({message: "Internal Server Error", status: 500});
            }
        }   
    } catch {
        // Log this error to an error log file
        res.statusCode = 503;
        res.json({message: "Service Unavailable", status: 503});
    }
});

// Delete the login 
router.delete('/:id', async (req, res) => {
    if(DEBUG) console.log('ROUTE: /api/auth DELETE ' + req.params.id);
    try {
        await dal.deleteLogin(req.params.id);
        res.statusCode = 200;
        res.json({message: "OK", status: 200});
    } catch {
        // Log this error to an error log file
        res.statusCode = 503;
        res.json({message: "Service Unavailable", status: 503});
    }
});

module.exports = router;