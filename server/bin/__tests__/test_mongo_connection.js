const Article = require('../../models/article');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

//ensure mongo connected before all tests
beforeAll(() => {
test('mongoose connected', done => {
  mongoose.connect('mongodb://localhost/users_test');
  mongoose.connection
      .once('open', () => { done(); })
      .on('error', (error) => {
        console.warn('Warning', error);
      });
  });
});


// beforeEach((done) => {
//   mongoose.connection.collections.articles.drop(() => {
//     // Ready to run the next test!
//     done();
//   });
// });



describe('Creating records', () => {

  test('testing...', () => {
    expect(1).toBe(1);
  })

  test('saves a user', done => {

    var article = new Article({ title: 'sdf', slug: 'sdfdf', body: 'sdfdf' });
    


    article.save(function(err, createdArticle) {
      done();
      console.log(createdArticle);
      if (err) {
        console.log('error: ', err);
      } else {
        
      }
    });

    // joe.save()
    //   .then(() => {
    //     // Has joe been saved successfully?
    //     expect(joe.isNew).toBe(undefined);
        
    //   });


      // article.save(function(err) {
      //   consoel.log(err)
      //   if (!err) { 
      //     done();
      //   }
      // });


        // var article = new Article({ title: 'someTitle', slug: 'someSlug',  body: 'bodyText' });

        // article.save()
        //   .then(() => {
        //     done();
        //   })

        //  {

          
          
        //   if (err) {
        //     console.log('error: ', err);
        //   } else {
        //     console.log(createdArticle);
            
        //   }
        // });


  });
});