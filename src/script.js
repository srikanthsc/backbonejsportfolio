var App = window.App || {};

/*  ===============================
    PROJECTS
    =============================== */

    // Model
    App.Project = Backbone.Model.extend();

    // Collection
    App.Projects = Backbone.Model.extend({
        model : App.Project
    });

	// List of projects
    var Projects = new App.Projects([
        { title : "Portfolio with Angular", visual : "Angular_full_color_logo.svg.png", link : "https://srikanthsc.github.io/srikanthsc.angularportfolio/"},
        { title : "Portfolio with React.js", visual : "React-icon.svg.png", link : "https://srikanthsc.github.io/srikanthsc.reactportfolio/"},
        { title : "Portfolio with Vue.js", visual : "vue.png", link : "https://srikanthsc.github.io/srikanthsc.vuejsportfolio2/"}
    ]);

/*  ===============================
    VIEWS
    =============================== */

    // Home
    App.homeView = Backbone.View.extend({

        el : "#mainContent",

        initialize: function(){
            console.log("Home");
            this.template = _.template($('#home').html());
        },

        render : function(){
            this.$el.html(this.template);
            return true;
        }
    });

    // About
    App.aboutView = Backbone.View.extend({

        el : "#mainContent",

        initialize : function(){
            console.log("About");
            this.template = _.template($('#about').html());
        },

        render: function(){
            this.$el.html(this.template);
            return true;
        }
    });

    // Projects
    App.projectsView = Backbone.View.extend({

        el : "#mainContent",

        initialize : function(){
            console.log("Projects");
            this.template = _.template($('#projects').html());
        },

        render : function(){
            this.$el.html( this.template({ projects: this.collection.toJSON() }) );
            return true;
        }
    });

    // Contact
    App.contactView = Backbone.View.extend({

        el : "#mainContent",

        initialize : function(){
            console.log("Contact");
            this.template = _.template($('#contact').html());
        },

        render : function(){
            this.$el.html(this.template);
        }
    });

/*  ===============================
    ROUTES
    =============================== */

    App.Routes = Backbone.Router.extend({

        routes : {
            '':          "home",
            "home":      "home",
            "about":     "about",
            "projects":     "projects",
            "contact":     "contact"
        },

        home : function(){
            var homeView = new App.homeView();
            homeView.render();
        },

        about : function(){
            var aboutView = new App.aboutView();
            aboutView.render();
        },

        projects : function(){
            var projectsView = new App.projectsView({ collection : Projects });
            projectsView.render();
        },

        contact : function(){
            var contactView = new App.contactView();
            contactView.render();
        }
    });

    var myRoutes = new App.Routes();
    Backbone.history.start();

/*  ===============================
    MENU
    =============================== */

    var menuActiveHandler = function(){
        // On menu click
        $('.mainMenu li a').on('click', function(){
            $('.mainMenu li').removeClass();
            $(this).parent().addClass('active');
        });
    }

    var menuActiveLocationHandler = function(){
        var currentPageName = location.hash;
        $('.mainMenu li').removeClass();
        currentPageName ?
            $('.mainMenu li a[href="'+ currentPageName +'"]').parent().addClass('active') :
            $('.mainMenu li a[href="#home"]').parent().addClass('active');
    }

    // On page load
    menuActiveHandler();
    menuActiveLocationHandler();

    // On location change
    $(window).bind('hashchange', function() {
        menuActiveLocationHandler();
    });