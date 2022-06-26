import React from 'react'
import './DateOfBirth.sass'

const DateOfBirth = () => {

	return (
		<div>
			<input type='date' className='calendar-input' max={new Date().toISOString().slice(0, 10)}/>
			<p className='error-message'/>
		</div>
	)
}

export default DateOfBirth