/** Main application file to start the client side single page app (only a stub for Ü6)
 *
 * @author Johannes Konert
 */

requirejs.config({
    baseUrl: "/js",
    paths: {
        jquery: './_lib/jquery-1.11.3',
        underscore: './_lib/underscore-1.8.3',
        backbone: './_lib/backbone-1.2.3'
    },
    shim: {
        underscore: {
            exports: "_"
        },
        backbone: {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        }
    }
});

// AMD conform require as provided by require.js
require(['jquery','backbone'],
        function($, Backbone, User, UserView) {

    var AppRouter = Backbone.Router.extend({
        routes: {
            '': 'main',
            '*whatever': 'main'
        },
        main: function(){
            $('body').prepend('<h1>Video App</h1>');
            // var user = new User.Model({_id : '57554efd6c5edc1f5c9a2778'});  // hard coded instead of login..
            //
            // var userView = new UserView({model: user});
            // var that = this;
            // user.fetch( {
            //    error: function(model, response) {
            //        console.error("no user fetched");
            //        userView.render();
            //    },
            //     success: function(model, response) {
            //        userView.render();
            //         that.user = user;
            //     }
            // });
        }
    });

    var myRouter = new AppRouter();

    // finally start tracking URLs to make it a SinglePageApp (not really needed at the moment)
    Backbone.history.start({pushState: true}); // use new fancy URL Route mapping without #
});
