const keyMap = {
  genus: 'k_genus',
  species: 'k_species',
  points: 'i_points',
  county: 'k_county',
  // 'Common Name', 'Address',
}

export const formatTreeData = (data) => {
  const formattedData = data.map((d) => {
    const formattedRow = {}
    Object.keys(d).forEach((key) => {
      if (keyMap[key]) {
        formattedRow[keyMap[key]] = d[key]
      }
    })
    return d
  })
  return formattedData = {
    columns: ['Genus', 'Species', 'Points', 'County', 'Common Name', 'Address'],
  }
}

export default {}
