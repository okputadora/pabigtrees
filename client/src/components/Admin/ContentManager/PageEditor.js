import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Popover, PopoverInteractionKind } from '@blueprintjs/core'

import Page from '@/components/Page/Page'

class PageEditor extends Component {
  componentDidMount() {
    // fetch page data and copy to state
  }

  confirmDelete = () => {
    console.log('DELETED!')
  }

  handleEdit = (val, id) => {
    console.log(val, id)
  }

  confirmPageEdits = () => {
    // send currentState to API
  }

  render() {
    const { name } = this.props
    return (
      <div>
        <div>
          current page:
          {' '}
          {name}
        </div>
        <div className="pageEditor-mode">
          <Popover interactionKind={PopoverInteractionKind.CLICK} position="right">
            <Button text="🗑️" />
            <div className="pageEditor-deleteModal">
              Are you sure you want to delete this page?
              <Button className="bp3-popover-dismiss danger" text="yes" onClick={this.confirmDelete} />
              <Button className="bp3-popover-dismiss" text="cancel" />
            </div>
          </Popover>
        </div>
        <div className="pageEditor-content">
          <Page isAdmin handleEdit={this.handleEdit} />
        </div>
      </div>
    )
  }
}

PageEditor.propTypes = {
  name: PropTypes.string.isRequired,
}

export default PageEditor
