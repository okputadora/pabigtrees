/* eslint-disable react/prop-types */
import React from 'react'
import ReactMarkDown from 'react-markdown'

import Paragraph from '@/components/Common/Paragraph'
import Section from '@/components/Common/Section'
import Image from '@/components/Common/Image'
import ExternalLink from '@/components/Common/ExternalLink'
import Header from '@/components/Common/Header'
import Card from '@/components/Common/Card'
import BigText from '@/components/Common/BigText'

export default ({ sections }, ...rest) => sections.sort((a, b) => a.order - b.order).map((section, i) => {
  const {
    id,
    section_type,
    content,
    secondary_content,
    additional_info,
  } = section
  const sectionTypeMap = {
    paragraph: Paragraph,
    section: Section,
    image: Image,
    link: ExternalLink,
    header: Header,
    card: Card,
    bigtext: BigText,
  }
  const Comp = sectionTypeMap[section_type]
  // If the previous or next element is inline
  const isNextInline = sections[i + 1] && sections[i + 1].additional_info === 'inline'
  const isPreviousInline = sections[i - 1] && sections[i - 1].additional_info === 'inline'
  if (section_type === 'image') {
    return <Comp key={id} src={secondary_content} alt={content} text={content} />
  }
  if (section_type === 'link') {
    return <Comp key={id} {...rest} href={secondary_content} text={content} inline={additional_info === 'inline'} />
  } if (section_type === 'card') {
    return <Comp key={id} title={content} {...rest}><ReactMarkDown>{secondary_content}</ReactMarkDown></Comp>
  }
  return <Comp key={id} isNextInline={isNextInline} isPreviousInline={isPreviousInline} {...rest}><ReactMarkDown>{content}</ReactMarkDown></Comp>
})
