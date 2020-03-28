import React, { Component } from 'react'
import TreesTable from '@/components/Trees/TreesTable'

class DatabaseManager extends Component {
  render() {
    return (
      <TreesTable isAdmin {...this.props} />
    )
  }
}

export default DatabaseManager
