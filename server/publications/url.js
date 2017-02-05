Meteor.publish('url', function(shortURL) {
    var url = URLs.findOne({shortURL: shortURL});

    if (!url) return this.ready();

    if ( url.isPrivate && url.userId !== this.userId ) {
        return URLs.find({shortURL: shortURL}, {fields: {shortURL: 1}});
    }

    return URLs.find({shortURL: shortURL});
});
