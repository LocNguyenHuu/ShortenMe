Template.UserUrlIndex.helpers({
   hasURL: function() {
       return URLs.find({userId: Meteor.userId()}).count();
   }
});

Template.UserUrlIndex.rendered = function() {
    $.material.init();
};
