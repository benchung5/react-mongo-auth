// var models = require('../models/index');
var express = require('express');
var router = express.Router();
const Articles = require('../controllers/articles');
// const handleError = require('../lib/handle_errors');

// /articles/create
router.post('/create', Articles.createArticle);
// router.post('/create', function (req, res) {
//     models.Article.create({
//         slug: req.body.slug,
//         title: req.body.title,
//         body: req.body.body
//     }).then(function (articles) {

//         res.json(articles);

//     }).catch(function (error) {

//         //we must check the error this way because sequelize will handle errors differently
//         //depending on what kind of error it is.
//         let errorMessage = handleError(error);

//         res.json({ error: errorMessage });

//     });
// });

/// /articles/delete
router.post('/delete', Articles.deleteArticle);
// router.post('/delete', function (req, res) {

//     models.Article.destroy({
//         where: {
//             slug: req.body.slug
//         }
//     }).then(function (articles) {

//         res.json(articles);

//     }).catch(function (error) {

//         //Todo: handle this error on the client end if needed
//         let errorMessage = handleError(error);
//         res.json({ error: errorMessage });

//     });
// });

/// /articles/all
router.get('/all', Articles.getArticles);
// router.get('/all', function (req, res) {

//     res.json({message: 'articles route'});
//     // models.Article.findAll().then(function (articles) {
//     //     res.json(articles);
//     // });

// });

/// /articles
router.get('/', function (req, res) {
    res.json({message: 'articles route'});
});



module.exports = router;