import React from 'react'
import './Number.sass'

const Number = () => {

	return (
		<div>
			<input type='number' className='inputs' placeholder='+7'/>
			<p className='error-message'/>
		</div>
	)
}

export default Number