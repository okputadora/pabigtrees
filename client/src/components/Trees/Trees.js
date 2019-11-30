import React from 'react'

const Trees = (props) => (props.data ? <div>{props.data.map((t) => t.id)}</div> : <div>loading</div>)

export default Trees
