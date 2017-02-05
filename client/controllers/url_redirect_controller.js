UrlRedirectController = RouteController.extend({
  title: 'URL Redirect'
  , data: function() {
      Meteor.user();
      return URLs.findOne({}, {reactive: false});
  }
  , waitOn: function() {
      return Meteor.subscribe('url', this.params.shortURL);
  }
});
