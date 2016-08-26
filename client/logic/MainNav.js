Template.MainNav.events({
	'click .login-toggle': function() {
		Session.set('nav-toggle', 'open');
	},
	'click .logout': function() {
		AccountsTemplates.logout();
        Session.set('nav-toggle', '');
	}
});

Template.Home.events({
	'click .login-toggle': function() {
		Session.set('nav-toggle', 'open');
	},
	'click .logout': function() {
		AccountsTemplates.logout();
        Session.set('nav-toggle', '');
	}
});