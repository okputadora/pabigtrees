import React from 'react'
import { Column, Table } from '@blueprintjs/table'

import '@blueprintjs/table/lib/css/table.css'
import './trees.scss'

const Trees = (props) => {
  const { data } = props
  return data
    ? (
      <Table numRows={10} className="table">
        {data.columns.map((col) => (
          <Column name={col}>
            {data.map((t) => t.id)}
          </Column>
        ))}
      </Table>
    )
    : <div>loading</div>
}

export default Trees
