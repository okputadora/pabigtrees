import React, { Component } from 'react'
import { Button, Popover, PopoverInteractionKind } from '@blueprintjs/core'
import Page from '@/components/Page/Page'

class PageEditor extends Component {
  state = {
    isPreviewing: false,
  }

  confirmDelete = () => {
    console.log('DELETED!')
  }

  handleEdit = (val, id) => {
    console.log(val, id)
  }

  render() {
    const { name } = this.props
    const { isPreviewing } = this.state
    return (
      <div>
        <div>
          current page:
          {' '}
          {name}
        </div>
        <div className="pageEditor-mode">
          <Button
            onClick={() => this.setState((prevState) => ({ isPreviewing: !prevState.isPreviewing }))}
            text={!isPreviewing ? '👁️' : '✎'}
          />
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
          {isPreviewing && <Page isAdmin handleEdit={this.handleEdit} />}
        </div>
      </div>
    )
  }
}

export default PageEditor
