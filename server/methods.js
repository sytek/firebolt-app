// Load future from fibers
var Future = Npm.require("fibers/future");
// Load exec
var exec = Npm.require("child_process").exec;

Meteor.methods({
   toggleAdmin(id){
       if (Roles.userIsInRole(id, 'admin')){
            Roles.removeUsersFromRoles(id, 'admin');
        }
        else {
            Roles.addUsersToRoles(id, 'admin');
        }
   },

    deleteFiles: function (filter) {
        return Files.remove(filter);
    },

    runCode: function () {
      // This method call won't return immediately, it will wait for the
      // asynchronous code to finish, so we call unblock to allow this client
      // to queue other method calls (see Meteor docs)
      this.unblock();
      var future=new Future();
      var command="cd /; ls -l";
      exec(command,function(error,stdout,stderr){
        if(error){
          console.log(error);
          throw new Meteor.Error(500,command+" failed");
        }
        future.return(stdout.toString());
      });
      return future.wait();
   },

   runElastic: function(hashval, action){
   // initialize without query options
          var config = {
              host: "http://localhost:9200"
          };
          var es = new ElasticRest(config);

          // and pass options as parameter at the time of querying
          var options = {
              index: 'firebolt',
              type: 'endpoint',
              query: {
                  match: {"hash": hashval }
              }
          };

          //SEND QUERY COMMAND
          res = es.doSearch(options);

          if (action == 'delete' ) {
             for (var i = 0; i < res.hits.hits.length; i++) {
               idval = res.hits.hits[i]._id;

                  var deloptions = {
                          index: 'firebolt',
                          type: 'endpoint',
                          id: idval
                       };
                       //SEND QUERY COMMAND
                       dres = es.doDelete(deloptions);
                       console.log(dres);
             console.log('will be deleting');
          }
          } else {
             console.log("not delete right now");
          }
          console.log(res.hits.hits[0]._id);
          return res;
       }

});
