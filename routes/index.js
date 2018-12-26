var express = require('express');
var router = express.Router();   // определяет, как приложение отвечает на клиентский запрос к конкретному адресу (URI)

// Get Homepage
router.get('/', ensureAuthenticated, function(req, res){
	res.render('index');
});

// Get Homepage
router.get('/aboutBook', ensureAuthenticated, function(req, res){
    res.render('aboutBook');
});

// Get Homepage
router.get('/collections', ensureAuthenticated, function(req, res){
    res.render('collections');
});

router.get('/firstChapter', ensureAuthenticated, function(req, res){
    res.render('firstChapter');
});
router.get('/secondChapter', ensureAuthenticated, function(req, res){
    res.render('secondChapter');
});
router.get('/thirdChapter', ensureAuthenticated, function(req, res){
    res.render('thirdChapter');
});
router.get('/fourthChapter', ensureAuthenticated, function(req, res){
    res.render('fourthChapter');
});
router.get('/fifthChapter', ensureAuthenticated, function(req, res){
    res.render('fifthChapter');
});
router.get('/sixthChapter', ensureAuthenticated, function(req, res){
    res.render('sixthChapter');
});
function ensureAuthenticated(req, res, next){//если неаутенцирован, то на главную
	if(req.isAuthenticated()){
		return next();
	} else {
		//req.flash('error_msg','You are not logged in');
		res.redirect('/users/login');
	}
}

module.exports = router;