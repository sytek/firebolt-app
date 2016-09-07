Meteor.publish('allUsers', function(){
    if (Roles.userIsInRole(this.userId, 'admin')){
        return Meteor.users.find({});
    }
});

Meteor.publish('files', function (fields, options) {
    fields = _.extend({}, fields, {});
    options = _.extend({}, options, {});

    if (!this.userId) {
        // Publish only public files
        // with no userId attached.
        fields.userId = null;
    }
    return [
        Files.find(fields, options)
    ];
});