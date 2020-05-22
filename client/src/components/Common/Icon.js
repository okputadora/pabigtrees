import React from 'react'
import { Tooltip } from '@blueprintjs/core'

const NationalChamp = (
  <Tooltip content="National Champ">
    <i className="fas fa-trophy" />
  </Tooltip>
)

const Tallest = (
  // <Popover content={<h1>Tallest</h1>}>
  <Tooltip content="Tallest of its species">
    <i className="fas fa-tree" />
  </Tooltip>
  // </Popover>
)
const icons = {
  tallest: Tallest,
  nationalChamp: NationalChamp,
}
const Icon = ({ name }) => <div>{icons[name]}</div>
export default Icon
