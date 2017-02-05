import React from 'react'

import Header from './Header'
import CreateLink from './CreateLink'
import LinkList from '../containers/LinkList'

const App = () => {
  return (
    <div>
      <Header />
      <CreateLink />
      <LinkList />
    </div>
  )
}

export default App