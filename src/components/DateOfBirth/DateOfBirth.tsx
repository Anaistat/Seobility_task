import React, { ChangeEvent, FC, useCallback, useContext, useEffect, useState } from 'react'
import './DateOfBirth.sass'
import FormContext from '../../context/form.context'
import { FieldData, FormStatus } from '../../types'

const DateOfBirth:FC<{name: string}> = ({ name }) => {

	const { updateField, formStatus } = useContext(FormContext)
	const [data, setData] = useState<FieldData>({
		name,
		error: '',
		data: ''
	})

	const birthdayHandler = useCallback((event: ChangeEvent<HTMLInputElement>) =>{
		let error = ''
		const data = new Date(event.target.value).toLocaleDateString()
		if(data === ''){
			error = 'Please, choose your date of birth'
		}
		setData( { name, error, data })
	}, [])

	useEffect(()=>{
		updateField(data)
	}, [data])

	useEffect(()=>{
		if(formStatus === FormStatus.Success){
			setData({
				name,
				error: '',
				data: ''
			})
		}
	}, [formStatus])

	return (
		<div>
			<label htmlFor='calendar'>
				<input type='date' className='calendar-input' min='1900-06-26' name='calendar' onChange={e=>birthdayHandler(e)} max={new Date().toISOString().slice(0, 10)}/>
			</label>
			<p className='error-message'>{data.error}</p>
		</div>
	)
}

export default DateOfBirth