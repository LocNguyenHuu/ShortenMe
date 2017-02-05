import { Meteor } from 'meteor/meteor'

import { Links } from '../links.js'

Meteor.publish('links', () => {
  return Links.find()
})
