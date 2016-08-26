if(Meteor.isClient){    
    Accounts.onLogin(function(){
        FlowRouter.go('dashboard');  
    });

    Accounts.onLogout(function(){
        FlowRouter.go('home');  
    });
}


// Go HOME if not logged in
FlowRouter.triggers.enter([function(context, redirect){
    if (!Meteor.userId()){
        FlowRouter.go('home');
    }
}]);

// Home Page
FlowRouter.route('/', {
    name: 'home',
    action() {
        BlazeLayout.render("HomeLayout", {main: "Home"});
    }
});

// Home Page
FlowRouter.route('/dashboard', {
    name: 'dashboard',
    action() {
        BlazeLayout.render("AppLayout", {main: "Dashboard"});
    }
});

// Recods Page
FlowRouter.route('/records', {
    name: 'records',
    action() {
        BlazeLayout.render("AppLayout", {main: "Records"});
    }
});

// Recods Page
FlowRouter.route('/upload', {
    name: 'upload',
    action() {
        BlazeLayout.render("AppLayout", {main: "Upload"});
    }
});
//Admin Routes
var adminRoutes = FlowRouter.group({
        prefix: '/admin',
        name: 'admin'
});

adminRoutes.route('/users', {
    name: 'users',
    action() {
        BlazeLayout.render("AppLayout", {main: "Users"});
    }
});