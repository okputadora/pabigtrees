import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Popover, PopoverInteractionKind } from '@blueprintjs/core'
import * as API from '@/api/page'

import './pageEditor.scss'
import Page from '@/components/Page/Page'

const paths = {
  homepage: '5de12e6538a99e3154370d02',
  measurement: '5de12ed038a99e3154370d03',
}
class PageEditor extends Component {
  state =
    {
      pageData: null,
      sections: null,
      isUnsaved: false,
      isEdited: false,
    }

  componentDidMount() {
    this.fetchPageData()
  }

  componentDidUpdate(prevProps) {
    const { name } = this.props
    const { name: prevName } = prevProps
    if (name !== prevName) {
      this.fetchPageData()
    }
  }

  fetchPageData = async () => {
    const { name } = this.props
    try {
      const { data } = await API.getPageData(paths[name])
      const sections = data.sections.reduce((acc, s) => {
        const id = s._id
        acc[id] = s
        return acc
      }, {})
      this.setState({
        sections, pageData: data, isEdited: false, isUnsaved: false,
      })
    } catch (err) {
      console.log('something went wrong', err)
    }
  }

  confirmDelete = () => {
    console.log('DELETED!')
  }

  handleEdit = (val, field = 'text', id) => {
    const { sections } = { ...this.state }
    if (sections[id][field] !== val) {
      sections[id][field] = val
      sections[id].isEdited = true
      this.setState({ sections, isUnsaved: true, isEdited: true })
    }
  }

  publish = async () => {
    // send currentState to API
    const { sections } = { ...this.state }
    const sectionsToUpdate = Object.keys(sections).filter((key) => sections[key].isEdited).map((key) => {
      delete sections[key].isEdited
      return sections[key]
    })
    try {
      await API.updateSections(sectionsToUpdate)
      console.log('saved!')
      this.setState({ isUnsaved: false })
      // @ TODO Alert
    } catch (err) {
      // @TODO ALert
    }
  }

  render() {
    const { pageData, isUnsaved, isEdited } = this.state
    return (
      <div>
        <div className="pageEditor-mode">
          <Button text="Publish" onClick={this.publish} />
          <Popover interactionKind={PopoverInteractionKind.CLICK} position="right">
            <Button text="🗑️" />
            <div className="pageEditor-deleteModal">
              Are you sure you want to delete this page?
              <Button className="bp3-popover-dismiss danger" text="yes" onClick={this.confirmDelete} />
              <Button className="bp3-popover-dismiss" text="cancel" />
            </div>
          </Popover>
          {isUnsaved
            ? <div className="pageEditor-unsaved">You have unsaved work!</div>
            : <div className="pageEditor-saved">{isEdited && 'Saved!'}</div>}
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
