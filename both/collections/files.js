import {Mongo} from 'meteor/mongo';

Files = new Mongo.Collection('files');

fileStore = new UploadFS.store.Local({
    collection: Files,
    name: 'files',
    scanned: false,
    path: '/uploads/',
    mode: '0777', // directory permissions
    writeMode: '0777', // file permissions
    // Apply a filter to restrict file upload
    filter: new UploadFS.Filter({
        minSize: 1,
        maxSize: 1024 * 60000, // 60MB
        extensions: ['pdf', 'tsv', 'csv']
    })
});

// Allow only files to be updated, and deleted from the client
Files.allow({
    insert: function (userId, file) {
        return false;
    },
    remove: function (userId, file) {
        return true;
    },
    update: function (userId, file, fields, mod) {
        return true;
    }
});
