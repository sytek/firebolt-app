
Template.hashes.helpers({

});

Template.hashes.events({
    'submit form': function (event){
            event.preventDefault();
            var hashval = event.target.hashinput.value;
            var hashAction = event.target.hashAction.value;


            event.target.hashinput.value = '';

            Meteor.call('runElastic', hashval, hashAction, function (err, response) {

                    console.log(response.hits.hits[0]._source.filename);

            });

      }
});
