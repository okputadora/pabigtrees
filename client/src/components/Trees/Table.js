import React from 'react'
import PropTypes from 'prop-types'

import Icon from '@/components/Common/Icon'

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
  <div>
    <div className="tree-data-container">
      <table className="table">
        <thead><tr>{columns.map((col) => <th onClick={setSortBy} id={col} key={col} className="table-header">{col}</th>)}</tr></thead>
        <tbody>
          {tableData ? tableData.map((row, i) => (
            <tr onClick={() => goToTreePage(row.id)} className={`row ${i % 2 === 0 ? 'even' : 'odd'}`} key={row.id}>
              {Object.keys(row).filter((k) => k !== 'id').map((key) => {
                if (key === 'additional info') {
                  return (
                    <td>
                      <span className="table-icon">
                        {row[key][0] === 1 && <Icon name="nationalChamp" />}
                        {row[key][1] === 1 && <Icon name="tallest" />}
                      </span>
                    </td>
                  )
                }
                return <td key={`${row.id}=${row[key]}`} className="cell">{row[key]}</td>
              })}
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
  </div>
)

Table.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.stng).isRequired,
  setSortBy: PropTypes.func.isRequired,
  tableData: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  goToTreePage: PropTypes.func.isRequired,
  getPrevPage: PropTypes.func.isRequired,
  filters: PropTypes.shape({ page: PropTypes.number }).isRequired,
  getPage: PropTypes.func.isRequired,
  getNextPage: PropTypes.func.isRequired,
}

export default Table
