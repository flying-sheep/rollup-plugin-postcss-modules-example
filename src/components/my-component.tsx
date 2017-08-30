import * as React from 'react'

import style from './my-component.css'

export default class MyClass extends React.Component<{}, {}> {
	render() {
		return <div className={style.myClass} />
	}
}
