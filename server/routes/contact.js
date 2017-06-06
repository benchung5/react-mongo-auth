var models = require('../models/index');
const _ = require('lodash');
var express = require('express');
var router = express.Router();
var helper = require('sendgrid').mail
const env       = process.env.NODE_ENV || "development";
const config    = require(__dirname + '/../config.json')[env];
var sg = require('sendgrid')(config.contact.sendgrid_key);



//http://192.168.99.100/contact/send
router.post('/send', function (req, res, next) {


    //validate the form (express-validator)
    req.checkBody('email', 'A valid email is required').isEmail(); //Validate email
    req.checkBody('message', 'Message is required').notEmpty(); //Validate message


    var errors = req.validationErrors();
    //No errors were found.  Passed Validation!
    if (!errors) {

        from_email = new helper.Email(req.body.email);
        to_email = new helper.Email(config.contact.to_email);
        subject = "New contact form submission from your website!";
        content = new helper.Content("text/plain", req.body.message);
        mail = new helper.Mail(from_email, subject, to_email, content);

        var request = sg.emptyRequest({
            method: 'POST',
            path: '/v3/mail/send',
            body: mail.toJSON()
        });
        sg.API(request, function (error, response) {

            if (error) { 
                res.json({ error : error });
            }

            console.log(response.statusCode);
            console.log(response.body);
            console.log(response.headers);

            //if database is connected...
            if (!_.isEmpty(models)) {


                let articlesTemp = null;

                models.Article.findAll().then(function (articles) {
                    articlesTemp = articles;
                }).then(function () {
                    models.Article.findById('contact').then(function (article) {
                        if (article) {
                            //redirect to the content page url with query parameter
                            res.redirect('/contact' + '?sent=' + true);

                        } else {
                            console.log('logging response error');
                            res.status(404).render('404', { Url: req.url });
                        }
                    });

                });

            } else {
                res.status(500).render('error', {
                    message: 'no connection to database. Did you create one?',
                    error: {}
                });
            }

        });
    }
    //Display errors to user
    else {
        res.json({ error : errors[0].msg });
    }

});


module.exports = router;