UserUrlIndexController = RouteController.extend({
  title: 'Your URLs'
  , increment: 15
  , limit: function() {
      var currentRoute = Router.current();
      return currentRoute && currentRoute.params && parseInt(currentRoute.params.limit)
                                                    || this.increment;
  }
  , loadMorePath: function() {
      return Router.path('user.url.index', {limit: this.limit() + this.increment});
  }
  , data: function() {
      return {
          urls: URLs.find({userId: Meteor.userId()}, {sort: {timeModified: -1, timeCreated: -1}})
          , loadMorePath: this.loadMorePath()
      };
  },
  waitOn: function() {
      return Meteor.subscribe('userURLs', this.limit());
  }
});
