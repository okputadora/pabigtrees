import React, { Component } from 'react'
import { Button } from '@blueprintjs/core'
import { Select } from '@blueprintjs/select'

import PageEditor from './PageEditor'
import './contentManager.scss'

class ContentManager extends Component {
  state = {
    currentPage: 'homepage',
    pages: ['homepage', 'treeListings', 'measurement'],
  }

  renderItem = (name, { handleClick }) => <div key={name} onClick={handleClick} tabIndex={0} onKeyPress={handleClick} role="button">{name}</div>

  selectItem = (item) => {
    this.setState({ currentPage: item })
  }

  render() {
    const { currentPage, pages } = this.state
    return (
      <div className="contentManager-container">
        <div className="contentManager-pagePicker">
          <div className="contentManager-label">select a page to edit:</div>
          <Select
            items={pages}
            itemRenderer={this.renderItem}
            onItemSelect={this.selectItem}
          >
            <div className="contentManager-pagePicker-item">{currentPage}</div>
          </Select>
        </div>
        <PageEditor
          name={currentPage}
        />
      </div>
    )
  }
}

export default ContentManager
