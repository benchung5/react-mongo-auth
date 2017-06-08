const Article = require('../models/article');

exports.createArticle = function(req, res, next) {

	console.log(req.body);

	//var article = new Article(req.body);
	res.json(req.body);

	// article.save(function(err, createdArticle) {
	// 	console.log(createdArticle);
	// 	if (err) return next(err);
	// 	res.send(createdArticle);
	// });

	 // res.json({message: req.body})
}

exports.getArticles = function(req, res, next) {
	//find all - just pass in empty object
	//retun just the email fields (must use -_id to explictly exclude the id filed)
	var query = Article.find({}).select('title -_id');

	query.exec(function (err, foundArticles) {
		console.log(foundArticles);
	    if (err) return next(err);
	    res.send(foundArticles);
	});
}

exports.deleteArticle = function(req, res, next) {
	console.log(req.body);
	Article.findOneAndRemove(req.body, (err, deletedArticle) => {
		console.log(deletedArticle);
		if (err) return next(err);
		res.json(deletedArticle);
	});
}



// const Article = require('../models/Article');

// exports.getArticles = function(req, res, next) {
// 	//find all - just pass in empty object
// 	//retun just the email fields (must use -_id to explictly exclude the id filed)
// 	var query = Article.find({}).select('email -_id');

// 	query.exec(function (err, foundArticles) {
// 		console.log(foundArticles);
// 	    if (err) return next(err);
// 	    res.send(foundArticles);
// 	});
// }

// exports.deleteArticle = function(req, res, next) {
// 	console.log(req.body);
// 	Article.findOneAndRemove(req.body, (err, deletedArticle) => {
// 		console.log(deletedArticle);
// 		if (err) return next(err);
// 		res.json(deletedArticle);
// 	});
// }