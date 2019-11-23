import React, { Component } from 'react'
import { Button } from '@blueprintjs/core'
import Homepage from '@/components/Homepage/Homepage'

class PageEditor extends Component {
  state = {
    previewing: false,
  }

  render() {
    const { name } = this.props
    const { previewing } = this.state
    return (
      <div>
        <div>
          current page:
          {' '}
          {name}
        </div>
        <div className="pageEditor-mode">
          <Button
            onClick={() => this.setState((prevState) => ({ previewing: !prevState.previewing }))}
            text={!previewing ? '👁️' : '✎'}
          />
        </div>
        <div className="pageEditor-content">
          {previewing && <Homepage />}
        </div>
      </div>
    )
  }
}

export default PageEditor
