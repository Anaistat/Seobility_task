import React, { useCallback, useEffect, useState } from 'react'
import './FeedbackForm.sass'
import NameSurname from '../Name_Surname/NameSurname'
import Email from '../Email/Email'
import Number from '../Number/Number'
import DateOfBirth from '../DateOfBirth/DateOfBirth'
import Message from '../Message/Message'
import { FieldData } from '../../types'
import FormContext from '../../context/form.context'

const FeedbackForm = () => {

	const [formData, setFormData] = useState<Map<string, FieldData>>(new Map())

	const updateField = useCallback((data: FieldData) =>{
		const newMap: Map<string, FieldData> = new Map(Array.from(formData))
		newMap.set(data.name, data)
		setFormData(newMap)
	}, [])

	const sendForm = () =>{

	}

	useEffect(()=>{
		console.table(formData)
	}, [formData])


	return (
		<FormContext.Provider value={ { updateField } }>
			<form className='feedback-form'>
				<NameSurname name = 'name-surname'/>
				<Email/>
				<Number/>
				<DateOfBirth/>
				<Message/>
				<button className='send-form'>Send</button>
			</form>
		</FormContext.Provider>
	)
}

export default FeedbackForm