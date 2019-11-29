import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Popover, PopoverInteractionKind } from '@blueprintjs/core'
import * as API from '@/api/page'

import Page from '@/components/Page/Page'

const paths = {
  homepage: '5de12e6538a99e3154370d02',
}
class PageEditor extends Component {
  state =
    {
      pageData: null,
      sections: null,
    }

  async componentDidMount() {
    // fetch page data and copy to state
    const { name } = this.props
    const { data } = await API.getPageData(paths[name])
    const sections = data.sections.reduce((acc, s) => {
      const id = s._id
      acc[id] = s
      return acc
    }, {})
    this.setState({ sections, pageData: data })
  }

  confirmDelete = () => {
    console.log('DELETED!')
  }

  handleEdit = (val, field = 'text', id) => {
    const { sections } = { ...this.state }
    sections[id][field] = val
    sections[id].isEdited = true
    this.setState({ sections })
  }

  confirmPageEdits = async () => {
    // send currentState to API
    const { sections } = { ...this.state }
    const sectionsToUpdate = Object.keys(sections).filter((key) => sections[key].isEdited).map((key) => {
      delete sections[key].isEdited
      return sections[key]
    })
    try {
      await API.updateSections(sectionsToUpdate)
      console.log('saved!')
      // @ TODO Alert
    } catch (err) {
      // @TODO ALert
    }
  }

  render() {
    const { name } = this.props
    const { pageData } = this.state
    return (
      <div>
        <div>
          current page:
          {' '}
          {name}
        </div>
        <div className="pageEditor-mode">
          <Button text="save" onClick={this.confirmPageEdits} />
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
          {pageData && <Page isAdmin handleEdit={this.handleEdit} data={pageData} />}
        </div>
      </div>
    )
  }
}

PageEditor.propTypes = {
  name: PropTypes.string.isRequired,
}

export default PageEditor
