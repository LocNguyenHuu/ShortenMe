import { Meteor } from 'meteor/meteor'
import React, { Component } from 'react'
import '../../api/links/methods'

class CreateLink extends Component {
  constructor (props) {
    super(props)
    this.state = { error: '' }
  }
  render () {
    return (
      <form onSubmit={(e) => this._handleSubmit(e)}>
        <div className='form-group'>
          <label>Link to shorten</label>
          <input ref='input' className='form-control' />
        </div>
        <div className='text-danger'>{this.state.error}</div>
        <button className='btn btn-primary'>Shorten!</button>
      </form>
    )
  }

  _handleSubmit (e) {
    e.preventDefault()

    Meteor.call('links.insert', this.refs.input.value, error => {
      if (error) {
        this.setState({ error: 'Enter a valid URL' })
      } else {
        this.setState({ error: '' })
        this.refs.input.value = ''
      }
    })
  }
}

export default CreateLink