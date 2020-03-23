var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/access', function(req, res, next) {
    //res.send('respond with a resource');
    var client_id, redirect_url, state, scope, response_type = null;
    var params = req.query;

    if(!params.client_id || !params.redirect_uri || !params.state || !params.response_type){
        // return res.sendStatus(404).sendStatus("Parameters incorrect!");
    }else{
        client_id = params.client_id;
        redirect_url = params.redirect_uri;
        state = params.state;
        scope = params.scope;
        response_type = params.response_type;
    }

    console.log("login request: ", JSON.parse(JSON.stringify({
        "clientID" : client_id,
        "redirect_URI" : redirect_uri,
        "state" : state,
        "responseType" : response_type
    }, null, 2)));

    const temp_code = 1234;

    res.header("Content-Type", 'application/json');
    // res.send(JSON.stringify({"Client_ID" : client_id, "Redirect URI" : redirect_uri, "State" : state}, null, 2));
    res.redirect(`https://oauth-redirect.googleusercontent.com/r/smarthometest-8e1df?code=${temp_code}&state=${state}`);
}); 

router.get('/token', function(req, res, next) {
    console.log("[Token endpoint has been accessed.]");
    var client_id, client_secret, grant_type, code = null;
    var params = req.query;

    let obj
    if (grant_type === 'authorization_code') {
      obj = {
        token_type: 'bearer',
        access_token: '123access',
        refresh_token: '123refresh',
        expires_in: secondsInDay,
      }
      console.log("[Token] Auth Code Received.");
    } else if (grant_type === 'refresh_token') {
      obj = {
        token_type: 'bearer',
        access_token: '123access',
        expires_in: secondsInDay,
      }

      console.log("[Token] Refresh Token Received.");
    }
    res.status(HTTP_STATUS_OK).json(obj)
});




module.exports = router;