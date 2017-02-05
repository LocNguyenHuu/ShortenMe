Template.UrlRedirect.helpers({
    accessible: function() {
        return this.targetURL;
    }
    , redirect: function() {
        Meteor.call('/visit/insert', this.shortURL, function(error, result) {
            if (error) Notify.error(error.reason);
            else window.location = result;
        });
    }
});

Template.UrlRedirect.rendered = function() {
    $.material.init();
};
