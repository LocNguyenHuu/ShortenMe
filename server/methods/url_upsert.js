Meteor.methods({
  '/url/upsert': function(urlAttributes, targetURLHost) {
      check(_.omit(urlAttributes, '_id'), Schemas.URL);

      var newShortURL
          , existingRecord = URLs.findOne({_id: urlAttributes._id})
          , existingShortURL = existingRecord && existingRecord.shortURL

          , shortURLIsTaken = function(shortURL) {
              return URLs.findOne({shortURL: shortURL})
                     || _.contains(App.getReservedPaths(), shortURL);
          };

      if ( targetURLHost === App.processRootURL(process.env.ROOT_URL) ) {
          throw new Meteor.Error('already-shorten', 'This link is shortened.');
      }

      if ( existingRecord && urlAttributes.shortURL === existingShortURL ) {
          newShortURL = existingShortURL;
      } else if ( urlAttributes.shortURL ) {
          if ( shortURLIsTaken(urlAttributes.shortURL) ) {
              throw new Meteor.Error('link-not-available', 'The chosen short link is not available.');
          }
          else newShortURL = urlAttributes.shortURL;
      } else {
          do {
              newShortURL = Random.id().substring(0,5);
          } while ( shortURLIsTaken(newShortURL) );
      }

      if ( existingRecord ) {
          URLs.update({_id: urlAttributes._id}, {$set: {
              shortURL: newShortURL,
              targetURL: urlAttributes.targetURL,
              isPrivate: urlAttributes.isPrivate,
              timeModified: new Date()
          }});
      } else {
          URLs.insert( _.extend(urlAttributes, {shortURL: newShortURL}) );
      }

      return newShortURL;
  }
});
