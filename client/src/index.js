import React from 'react'
import ReactDOM from 'react-dom'

import App from './components/App'

const rootEl = document.getElementById('root')
const renderApp = () => {
  ReactDOM.render(<App />, rootEl)
}

renderApp()

// This checks for local changes and automatically refreshes the browser (hot-reloading)
if (module.hot) {
  module.hot.accept('./components/App.js', () => renderApp())
}
