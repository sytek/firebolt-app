import {Meteor} from 'meteor/meteor';
import {UploadFS} from 'meteor/jalik:ufs';

window.workers = {};

let deleteFiles = function (filter) {
    Meteor.call('deleteFiles', filter, function (err, result) {
        if (err) {
            console.error(err);
        } else if (result) {
            console.log(`${result} files have been deleted`);
        }
    });
};

Template.header.events({
    'click [name=delete-files]': function (ev) {
        ev.preventDefault();
        deleteFiles({});
    },
    'click [name=delete-public-files]': function (ev) {
        ev.preventDefault();
        deleteFiles({userId: null});
    },
    'click [name=delete-private-files]': function (ev) {
        ev.preventDefault();
        deleteFiles({userId: {$ne: null}});
    }
});

Template.uploadForm.events({
    'click [name=import]': function (ev, tpl) {
        ev.preventDefault();
        let url = window.prompt("URL to load:");

        if (url) {
            UploadFS.importFromURL(url, {}, FileStore, function (err, file) {
                if (err) {
                    console.error(err);
                } else if (file) {
                    tpl.$('[name=url]').val('');
                    console.log('file successfully imported : ', file);
                }
            });
        }
    },
    'click [name=upload]': function (ev, tpl) {
        ev.preventDefault();


        UploadFS.selectFiles(function (file) {
            const ONE_MB = 1024 * 1000;

            var uploader = new UploadFS.Uploader({
                adaptive: true,
                chunkSize: ONE_MB,
                maxChunkSize: ONE_MB * 10,
                data: file,
                file: file,
                scanned: false,
                store: fileStore,
                maxTries: 3
            });
            uploader.onAbort = function (file) {
                console.log(`${file.name} upload aborted`);
            };
            uploader.onComplete = function (file) {
                let time = (this.getElapsedTime() / 1000).toFixed(2);
                let avgSpeed = (this.getAverageSpeed() / 1024).toFixed(2);
                console.log(`${file.name} upload completed in ${time}s @ ${avgSpeed}KB/s`);
            };
            uploader.onCreate = function (file) {
                console.log(`${file.name} created`);
                workers[file._id] = this;
            };
            uploader.onError = function (err, file) {
                console.log(`${file.name} could not be uploaded`, err);
            };
            uploader.onProgress = function (file, progress) {
                console.log(file.name + ' :'
                    + "\n" + (progress * 100).toFixed(2) + '%'
                    + "\n" + (this.getSpeed() / 1024).toFixed(2) + 'KB/s'
                    + "\n" + 'elapsed: ' + (this.getElapsedTime() / 1000).toFixed(2) + 's'
                    + "\n" + 'remaining: ' + (this.getRemainingTime() / 1000).toFixed(2) + 's'
                );
            };
            uploader.start();
        });
    }
});

Template.fileTable.onCreated(function () {
    this.subscribe('files');
});

Template.fileTable.helpers({
    files: function () {
        return Files.find({}, {
            sort: {createdAt: 1, name: 1}
        });
    }
});

Template.fileTableRow.events({
    'click [name=delete]': function (ev) {
        var remFiles = this._id;
        ev.preventDefault();
        // SweetAlert setup
         swal({
                title: "Are you sure?",
                text: "You will not be able to recover this host file!",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: '#DD6B55',
                confirmButtonText: 'Yes, Axada Kedaxra',
                cancelButtonText: "No, Protego",
                closeOnConfirm: false,
                closeOnCancel: false
            },
            function(isConfirm) {
                if (isConfirm) {
                    swal({
                        title: 'Remowed!',
                        text: 'This file was killed! :(',
                        type: 'success'
                    }, function() {
                        Files.remove(remFiles);
                    });

                } else {
                    swal("Cancelled", "Your magical file is safe :)", "error");
                }
            });
    },
    'click [name=run]': function (ev) {
        ev.preventDefault();
        sweetAlert("Accio Firebolt!", "The file will now be processed by the Firebolt engine", "success");
        // RUN COMMAND FROM BASH SHELL
        Meteor.call('runCode', function (err, response) {
                console.log(response);
        });
        Files.update(this._id, {
            $set: {progress: 2}
        });


    },
    'click [name=abort]': function (ev) {
        ev.preventDefault();
        workers[this._id].abort();
    },
    'click [name=stop]': function (ev) {
        ev.preventDefault();
        workers[this._id].stop();
    },
    'click [name=start]': function (ev) {
        ev.preventDefault();
        workers[this._id].start();
    }
});

Template.fileTableRow.helpers({
    canAbort: function () {
        return workers.hasOwnProperty(this._id);
    },
    canDelete: function () {
        let userId = Meteor.userId();
        return userId === this.userId || !this.userId;
    },
    formatSize: function (bytes) {
        if (bytes >= 1000000000) {
            return (bytes / 1000000000).toFixed(2) + ' GB';
        }
        if (bytes >= 1000000) {
            return (bytes / 1000000).toFixed(2) + ' MB';
        }
        if (bytes >= 1000) {
            return (bytes / 1000).toFixed(2) + ' KB';
        }
        return bytes + ' B';
    },
    progress: function () {
        return Math.round(this.progress * 10000) / 100;
    },
    uploadedAtx: function () {
        return moment(this.uploadedAt).format('YYYY-MM-DD hh:mm a');
    },
    notScanned: function () {
        scanned = this.progress;
        return scanned === 1;
    }
});
