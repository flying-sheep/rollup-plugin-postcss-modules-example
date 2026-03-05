import * as ReactDOM from 'react-dom/client'

import MyComponent from './components/my-component'

// biome-ignore lint/style/noNonNullAssertion: exists
const root = ReactDOM.createRoot(document.querySelector('#main')!)
root.render(<MyComponent />)
