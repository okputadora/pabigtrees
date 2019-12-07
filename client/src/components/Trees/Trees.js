import React from 'react'

import TreeData from '@/components/Data/TreeData'

import './trees.scss'


const Trees = () => (
  <TreeData>
    {({ data }) => (data
      ? (
        <table className="table">
          <thead>{data.columns.map((col) => <th className="table-header">{col}</th>)}</thead>
          {data.data.map((row, i) => (
            <tr className={`row ${i % 2 === 0 ? 'even' : 'odd'}`}>
              {Object.keys(row).map((key) => <td className="cell">{row[key]}</td>)}
            </tr>
          ))}
        </table>
      )
      : <div>loading</div>)}
  </TreeData>
)
export default Trees
