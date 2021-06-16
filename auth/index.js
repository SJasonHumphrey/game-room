const authReq = (req, res, next) => {

    console.log('authenticated', req.isAuthenticated());
    if(req.isAuthenticated()){
        next()
    }
    else{
        res.redirect('/login')
    }
};

module.exports = authReq;