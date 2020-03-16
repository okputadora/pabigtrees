import React, { Component } from 'react'

import TreeData from '@/components/Data/TreeData'
import Filters from './Filters'
import './trees.scss'


class Trees extends Component {
  state = {
    sortField: 'points',
    sortOrder: 'DESC',
  }

  setSortBy = (e) => {
    e.persist()
    this.setState((prevState) => {
      const sameField = prevState.sortField === e.target.id
      const sortOrder = sameField && prevState.sortOrder === 'DESC' ? 'ASC' : 'DESC'
      return {
        sortField: e.target.id,
        sortOrder,
      }
    })
  }

  render() {
    const { sortField, sortOrder } = this.state
    return (
      <div className="tree-data-container">
        <Filters>
          {(filters) => (
            <TreeData sortBy={{ sortField, sortOrder }} filters={{ ...filters, sortField, sortOrder }}>
              {({ data }) => (data
                ? (
                  <table className="table">
                    <thead><tr>{data.columns.map((col) => <th onClick={this.setSortBy} id={col} key={col} className="table-header">{col}</th>)}</tr></thead>
                    <tbody>
                      {data.formattedData.map((row, i) => (
                        <tr className={`row ${i % 2 === 0 ? 'even' : 'odd'}`} key={row.id}>
                          {Object.keys(row).filter((k) => k !== 'id').map((key) => <td className="cell">{row[key]}</td>)}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )
                : (
                  <table className="table">
                    <thead><tr>{new Array(7).fill('').map((col) => <th className="table-header">{col}</th>)}</tr></thead>
                    {new Array(20).fill('ROW').map((row, i) => (
                      <tr className={`row ${i % 2 === 0 ? 'even' : 'odd'}`}>
                        {new Array(7).fill('CELL').map((key) => <td className="cell">{row[key]}</td>)}
                      </tr>
                    ))}
                  </table>
                ))}
            </TreeData>
          )}
        </Filters>
      </div>
    )
  }
}

export default Trees
