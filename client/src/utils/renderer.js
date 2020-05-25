/* eslint-disable react/prop-types */
import React from 'react'
import Components from '@/components/Common'

export default ({ sections }, ...rest) => sections.sort((a, b) => a.order - b.order).map((section) => {
  const {
    id,
    section_type,
    content,
    secondary_content,
  } = section
  const Comp = Components[section_type]
  if (section_type === 'Image') {
    return <Comp key={id} src={content} alt={secondary_content} />
  }
  if (section_type === 'Link') {
    return <Comp key={id} {...rest} to={secondary_content}>{content}</Comp>
  }
  return <Comp key={id} {...rest}>{content}</Comp>
})
