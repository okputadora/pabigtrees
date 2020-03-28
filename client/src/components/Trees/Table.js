import React from 'react'
import PropTypes from 'prop-types'

const Table = ({
  columns,
  setSortBy,
  tableData,
  goToTreePage,
  getPrevPage,
  filters,
  getPage,
  getNextPage,
}) => (
  <>
    <div className="tree-data-container">
      <table className="table">
        <thead><tr>{columns.map((col) => <th onClick={setSortBy} id={col} key={col} className="table-header">{col}</th>)}</tr></thead>
        <tbody>
          {tableData ? tableData.map((row, i) => (
            <tr onClick={() => goToTreePage(row.id)} className={`row ${i % 2 === 0 ? 'even' : 'odd'}`} key={row.id}>
              {Object.keys(row).filter((k) => k !== 'id').map((key) => <td key={`${row.id}=${row[key]}`} className="cell">{row[key]}</td>)}
            </tr>
          )) : new Array(20).fill('ROW').map((row, i) => (
            <tr key={i} className={`row ${i % 2 === 0 ? 'even' : 'odd'}`}>
              {new Array(7).fill('CELL').map((key, x) => <td key={`${i}${x}`} className="cell">{row[key]}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <div className="tree-data-pagination">
      {filters.page > 1 && <button type="button" onClick={getPrevPage}>Prev</button>}
      {new Array(10).fill().map((_, i) => (
        <button
          type="button"
          key={filters.page + i}
          onClick={getPage}
          id={filters.page + i}
        >
          {filters.page + i}
        </button>
      ))}
      <button type="button" onClick={getNextPage}>Next</button>
    </div>
  </>
)

export default Table
