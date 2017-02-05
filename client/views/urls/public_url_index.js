Template.PublicUrlIndex.helpers({
    hasPublicURLs: function() {
        return this.urls.count();
    }
});

Template.PublicUrlIndex.rendered = function() {
    $.material.init();
};
