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
      this.setState({ pageData: data })
    } catch (err) {
      alert('something went wrong', err)
    }
  }

  render() {
    const {
      pageData,
    } = this.state
    return pageData ? (
      <div>
        {pageData.sections.map((section) => <SectionEditor section={section} key={section.id} onEditSuccess={this.fetchPageData} />)}
        <AddSection pageId={pageData.page.id} onCreateSuccess={this.fetchPageData} />
      </div>
    ) : <div>loading</div>
  }
}

PageEditor.propTypes = {
  name: PropTypes.string.isRequired,
}

export default PageEditor
