Template.hashes.helpers({

});

Template.hashes.events({
    //'click [name = subAction]': function (ev) {
    'submit form': function (event){
            event.preventDefault();
            var hashval = event.target.hashinput.value;
            var hashAction = event.target.hashAction.value;

            console.log(hashval);
            console.log(hashAction);
            event.target.hashinput.value = '';
      }
});
