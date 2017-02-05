Template.UrlShow.helpers({
    accessible: function() {
        return this.targetURL;
    }
    , displayChart: function(category) {
        App.displayChart(category);
    }
});

Template.UrlShow.rendered = function() {
    $.material.init();
    $('h2').selectText();
};

Template.UrlShow.events({
    'click h2': function(e) {
        $(e.target).selectText();
    }
});
