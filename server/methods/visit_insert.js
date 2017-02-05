Meteor.methods({
  '/visit/insert': function(shortURL, clientIP, userAgent) {
      var url = URLs.findOne({shortURL: shortURL})
          , userId = this.userId;

      if (!url) {
          throw new Meteor.Error('link-not-found', "The short link '" + shortURL + "' does not exist.");
      }

      if ( url.isPrivate && (!userId || userId !== url.userId) ) {
          throw new Meteor.Error('not-authorized', 'This link is private and you are not its owner.');
      }

      clientIP = clientIP || headers.methodClientIP(this);
      userAgent = userAgent || headers.get(this)['user-agent'];

      var browser;
      if ( userAgent.indexOf('Firefox') >= 0 ) browser = 'Firefox';
      else if ( userAgent.indexOf('Chrome') >= 0 ) browser = 'Chrome';
      else if ( userAgent.indexOf('Safari') >= 0 && userAgent.indexOf('Chrome') < 0 ) browser = 'Safari';
      else if ( userAgent.indexOf('Opera') >= 0 ) browser = 'Opera';
      else if ( userAgent.indexOf('Trident') >= 0 ) browser = 'IE';
      else browser = 'Others';

      var os;
      if ( userAgent.indexOf('Win') >= 0 ) os = 'Windows';
      else if ( userAgent.indexOf('Mac') >= 0 ) os = 'MacOS';
      else if ( userAgent.indexOf('X11') >= 0 ) os = 'Unix';
      else if ( userAgent.indexOf('Linux') >= 0 ) os = 'Linux';
      else os = 'Others';

      var geoData = GeoIP.lookup(clientIP)
          , country = geoData ? App.getCountryName(geoData.country) : 'Unknown';

      Visits.insert({
          shortURL: shortURL,
          browser: browser,
          os: os,
          country: country
      });

      URLs.update({shortURL: shortURL}, {$inc: {visitCount: 1}});

      return url.targetURL;
  }
});
