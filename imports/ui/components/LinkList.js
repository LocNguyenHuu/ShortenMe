import React, { Component, PropTypes } from 'react'

import Link from './Link'

class LinkList extends Component {
  render () {
    return (
      <table className='table'>
        <thead>
          <tr>
            <th>URL</th>
            <th>Address</th>
            <th>Clicks</th>
          </tr>
        </thead>
        <tbody>
          {this._renderRows()}
        </tbody>
      </table>
    )
  }

  _renderRows () {
    return this.props.links.map(link => <Link link={link} />)
  }
}

LinkList.propTypes = {
  links: PropTypes.array
}

export default LinkList