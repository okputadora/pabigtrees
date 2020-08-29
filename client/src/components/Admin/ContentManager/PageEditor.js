import React, { Component } from 'react'
import PropTypes from 'prop-types'

import * as API from '@/api/page'
import SectionEditor from './SectionEditor'
import AddSection from './AddSection'
import './pageEditor.scss'

class PageEditor extends Component {
  state =
    {
      pageData: null,
      sections: null,
      isUnsaved: false,
      isEdited: false,
      isEditing: false,
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
      const { data } = await API.getPageData(name)
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
      this.setState({ isUnsaved: false })
      // @ TODO Alert
    } catch (err) {
      // @TODO ALert
    }
  }

  render() {
    const {
      pageData,
      isUnsaved,
      isEdited,
      isEditing,
    } = this.state
    console.log({ pageData })
    return pageData ? (
      <div>
        {pageData.sections.map((section) => <SectionEditor section={section} key={section.id} onEditSuccess={this.fetchPageData} />)}
        <AddSection sectionId={pageData.page.id} />
      </div>
    ) : <div>loading</div>
  }
}

PageEditor.propTypes = {
  name: PropTypes.string.isRequired,
}

export default PageEditor
