const Article = require('../models/article');

exports.createArticle = function(req, res, next) {
	console.log(req.body);
	var article = new Article(req.body);
	article.save(function(err, createdArticle) {
		console.log(createdArticle);
		console.log('error: ', err);
		if (err) {
			return res.send({ error: 'Article already exists' });
			return next(err);
		}
		res.send(createdArticle);
	});
}

exports.updateArticle = function(req, res, next) {
	console.log(req.body);
	Article.findOne({ slug: req.body.slug }, (err, articleToUpdate) => {
		console.log(articleToUpdate);
		articleToUpdate.title = req.body.title;
		articleToUpdate.slug = req.body.slug;
		articleToUpdate.body = req.body.body;
		articleToUpdate.save();
	    if (err) {
	    	return res.send({ error: 'Slug exists already' });
	    	return next(err);
	    }
	    res.json(articleToUpdate);
	});
}

exports.getArticles = function(req, res, next) {
	//find all - just pass in empty object
	var query = Article.find({}).select({ "slug": 1, "title": 1, "_id": 0 });

	query.exec(function (err, foundArticles) {
		console.log(foundArticles);
	    if (err) return next(err);
	    res.send(foundArticles);
	});
}

exports.getArticle = function(req, res, next) {
	//console.log('req.query.id: ', req.query.id);
	Article.findOne({ slug: req.query.id }, (err, foundArticle) => {
		console.log(foundArticle);
	    if (err) return next(err);
	    res.json(foundArticle);
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