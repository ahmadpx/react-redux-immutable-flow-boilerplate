import React from 'react'
import ReactDOM from 'react-dom'

import '../public/assets/scss/main.scss'

const App = () => (
  <div><h1>Hello world</h1></div>
)

ReactDOM.render(<App/>, document.getElementById('app'))

if (module.hot) {
  module.hot.accept(() => {
    ReactDOM.render(<App/>)
  })
}
