import React, { FormEvent, useState } from 'react'
import './FeedbackForm.sass'
import NameSurname from '../Name_Surname/NameSurname'
import Email from '../Email/Email'
import Number from '../Number/Number'
import DateOfBirth from '../DateOfBirth/DateOfBirth'
import Message from '../Message/Message'
import { FieldData } from '../../types'
import FormContext from '../../context/form.context'

interface Feedback{
	[key: string]: string
}

const FeedbackForm = () => {

	const mockSuccessMessage = {
		status: 'Success',
		message: 'Form successfully submitted!'
	}
	const [formData, setFormData] = useState<Map<string, FieldData>>(new Map())
	const [isSending, setIsSending] = useState<boolean>(false)
	const updateField = (data: FieldData) =>{
		const newMap: Map<string, FieldData> = new Map(Array.from(formData))
		newMap.set(data.name, data)
		setFormData(newMap)
	}

	const sendForm = (e:FormEvent<HTMLFormElement>) =>{
		e.preventDefault()
		setIsSending(true)
		const data = Array.from(formData)
		let feedbackData: Feedback = {}
		if(data.some(value=>value[1].error)){
			return
		}
		data.forEach(e=>{
			feedbackData[e[0]] = e[1].data
		})


	}

	return (
		<FormContext.Provider value={ { updateField } }>
			<form className='feedback-form' onSubmit={sendForm}>
				<NameSurname name='name-surname'/>
				<Email name='email'/>
				<Number name='number'/>
				<DateOfBirth name='date-of-birth'/>
				<Message name='message'/>
				<button className='send-form' disabled={isSending}>Send</button>
			</form>
		</FormContext.Provider>
	)
}

export default FeedbackForm