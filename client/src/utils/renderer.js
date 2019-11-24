/* eslint-disable react/prop-types */
import React from 'react'
import Layouts from '@/components/Layouts'
import Components from '@/components/Common'

export default ({
  layout, sections, column1,
}) => {
  const Layout = Layouts[layout]
  if (layout === 'TwoCol') {
    const col1 = []
    const col2 = []
    sections.forEach((section) => {
      const { component, index, ...rest } = section
      const Comp = Components[component]
      if (column1.includes(index)) {
        col1.push(<Comp key={index} {...rest} />)
      } else {
        col2.push(<Comp key={index} {...rest} />)
      }
    })
    return <Layout col1={col1} col2={col2} />
  }
  return (
    <Layout content={sections.map((section) => {
      const { component, index, ...rest } = section
      const Comp = Components[component]
      return <Comp key={index} {...rest} />
    })}
    />
  )
}
