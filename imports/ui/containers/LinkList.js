import { Meteor } from 'meteor/meteor'
import { createContainer } from 'meteor/react-meteor-data'

import { Links } from '../../api/links/links'

import LinkList from '../components/LinkList'

export default createContainer(() => {
  Meteor.subscribe('links')

  return { links: Links.find().fetch() }
}, LinkList)