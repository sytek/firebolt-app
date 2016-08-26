var postSignUp = function(userId, info){
    Roles.addUsersToRoles(userId, ['analyst', info.profile.role])
}

AccountsTemplates.configure({
        postSignUpHook: postSignUp
});