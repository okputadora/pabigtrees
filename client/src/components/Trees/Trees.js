import React from 'react'
import { Column, Table, Cell } from '@blueprintjs/table'

import TreeData from '@/components/Data/TreeData'

import '@blueprintjs/table/lib/css/table.css'
import './trees.scss'


const Trees = () => {
  const cellRenderer = (data) => <Cell className="cell">{data}</Cell>
  return (
    <TreeData>
      {({ data }) => {
        console.log('trees: ', data)
        return data
          ? (
            <Table numRows={10} className="table">
              {data.columns.map((col) => (
                <Column name={col} cellRenderer={(rowIndex, colIndex) => cellRenderer(data.data[rowIndex][col])} />
              ))}
            </Table>
          )
          : <div>loading</div>
      }}
    </TreeData>
  )
}
export default Trees
