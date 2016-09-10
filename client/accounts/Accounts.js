var myLogoutFunc = function(){
    FlowRouter.go('/');
}

AccountsTemplates.configure({
        onLogoutHook: myLogoutFunc
});

AccountsTemplates.addFields([
        {
            _id: "firstName",
            type: 'text',
            displayName: 'First Name',
            required: true,
            re: /(?=.*[a-z])/,
    	    errStr: 'Your name is required'
        },
        {
            _id: 'role',
            type: 'select',
            displayName: 'Role',
            select: [
                {
                    text: "Analyst",
                    value: "analyst"
                },
                {
                    text: "Administrator",
                    value: "admin"
                }
            ]
            
        }
]);