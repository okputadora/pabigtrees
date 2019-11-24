/* eslint-disable react/prop-types */
import React from 'react'
import Layouts from '@/components/Layouts'
import Components from '@/components/Common'

export default ({
  layout, sections, column1,
}, isAdmin = false, handleEdit) => {
  const Layout = Layouts[layout]
  if (layout === 'TwoCol') {
    const col1 = []
    const col2 = []
    sections.forEach((section) => {
      const {
        component, index, id, ...rest
      } = section
      const Comp = Components[component]
      if (column1.includes(index)) {
        col1.push(<Comp key={index} {...rest} isAdmin={isAdmin} handleEdit={(newText) => { handleEdit(newText, id) }} />)
      } else {
        col2.push(<Comp key={index} {...rest} isAdmin={isAdmin} handleEdit={(newText) => { handleEdit(newText, id) }} />)
      }
    })
    return <Layout col1={col1} col2={col2} />
  }
  return (
    <Layout content={sections.map((section) => {
      const {
        component, index, id, ...rest
      } = section
      const Comp = Components[component]
      return <Comp key={index} {...rest} isAdmin={isAdmin} handleEdit={(newText) => { handleEdit(newText, id) }} />
    })}
    />
  )
}
