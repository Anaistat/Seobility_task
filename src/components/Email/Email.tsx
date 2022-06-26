import React from 'react'
import './Email.sass'

const Email = () => {
	return (
		<div>
			<input type='email' className='inputs' placeholder='Email'/>
			<p className='error-message'/>
		</div>
	)
}

export default Email