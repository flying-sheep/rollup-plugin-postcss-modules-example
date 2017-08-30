import * as React from 'react'
import * as ReactDOM from 'react-dom'

import MyComponent from './components/my-component'

document.addEventListener('DOMContentLoaded', () => {
	ReactDOM.render(<MyComponent/>, document.querySelector('#main'))
})
