Router.configure({
  notFoundTemplate: 'NotFound'
  , loadingTemplate: 'Loading'
  , templateNameConverter: 'upperCamelCase'
  , routeControllerNameConverter: 'upperCamelCase'
  , layoutTemplate: 'MasterLayout'
});


// see /client/controllers
Router.map(function () {
  this.route('home', {path: '/'});
  this.route('url.show', {path: '/show/:shortURL'});
  this.route('url.edit', {path: '/edit/:shortURL'});
  this.route('url.redirect', {path: '/redirect/:shortURL'});
  this.route('user.url.index', {path: '/user/urls/:limit?'});
  this.route('public.url.index', {path: '/public/:limit?'});
  this.route('not.found', {path: '/url/not-found'});
});

Router.route('/:shortURL', function () {
  var request = this.request
    , response = this.response
    , url = URLs.findOne({shortURL: this.params.shortURL})
    , location;

  // Not found
  if (!url) {
    location = Router.path('not.found');
  } else if (url.isPrivate) {
    location = Router.path('url.redirect', {shortURL: url.shortURL});
  } else {
    var clientIP = (request.headers['x-forwarded-for'] || '').split(',')[0]
                   || request.connection.remoteAddress
                   || request.socket.remoteAddress
                   || request.connection.socket.remoteAddress

        , userAgent = request.headers['user-agent'];

    // Record data
    Meteor.call('/visit/insert', url.shortURL, clientIP, userAgent);

    location = url.targetURL;
  }

  response.writeHead(302, {'Location': location});
  response.end();
}, {where: 'server'});
