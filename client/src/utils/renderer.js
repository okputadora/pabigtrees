/* eslint-disable react/prop-types */
import React from 'react'
import Paragraph from '@/components/Common/Paragraph'
import Section from '@/components/Common/Section'
import Image from '@/components/Common/Image'
import Link from '@/components/Common/Link'
import Header from '@/components/Common/Header'

export default ({ sections }, ...rest) => sections.sort((a, b) => a.order - b.order).map((section) => {
  const {
    id,
    section_type,
    content,
    secondary_content,
  } = section
  const sectionTypeMap = {
    paragraph: Paragraph,
    section: Section,
    image: Image,
    link: Link,
    header: Header,
  }
  const Comp = sectionTypeMap[section_type]
  if (section_type === 'image') {
    return <Comp key={id} src={secondary_content} alt={content} text={content} />
  }
  if (section_type === 'link') {
    return <Comp key={id} {...rest} href={secondary_content} text={content} />
  }
  return <Comp key={id} {...rest}>{content}</Comp>
})
