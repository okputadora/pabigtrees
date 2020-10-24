import React, { useState } from 'react'
import { CSVLink } from 'react-csv'

import { getCSV } from '@/api/tree'

const AdminSummary = () => {
  const [csvData, setCsvData] = useState(null)
  return (
    <>
      <div>Admin Summary</div>
      <button
        type="button"
        onClick={async () => {
          try {
            setCsvData(null)
            const { data } = await getCSV()
            setCsvData(data)
          } catch (err) {
            alert(err)
          }
        }}
      >
        Download Database Dump (CSV)
      </button>
      {csvData && (
      <CSVLink data={csvData} target="_blank" filename={`${new Date()}.csv`}>
        {new Date().toString()}
        .csv
      </CSVLink>
      )}
    </>
  )
}

export default AdminSummary
