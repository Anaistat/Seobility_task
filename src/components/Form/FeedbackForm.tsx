import React, { FormEvent, useEffect, useState } from 'react'
import './FeedbackForm.sass'
import NameSurname from '../Name_Surname/NameSurname'
import Email from '../Email/Email'
import Number from '../Number/Number'
import DateOfBirth from '../DateOfBirth/DateOfBirth'
import Message from '../Message/Message'
import { FetchStatus, FieldData } from '../../types'
import FormContext from '../../context/form.context'

interface Feedback{
	[key: string]: string
}

const FeedbackForm = () => {

	const [serverResponse, setServerResponse] = useState<string>('')
	const [formData, setFormData] = useState<Map<string, FieldData>>(new Map())
	const [fetchStatus, setFetchStatus] = useState<FetchStatus>(FetchStatus.Nothing)

	const updateField = (data: FieldData) =>{
		const newMap: Map<string, FieldData> = new Map(Array.from(formData))
		newMap.set(data.name, data)
		setFormData(newMap)
	}

	const sendForm = async (e:FormEvent<HTMLFormElement>) =>{
		e.preventDefault()
		setFetchStatus(FetchStatus.Sending)
		const data = Array.from(formData)
		let feedbackData: Feedback = {}
		if(data.some(value=>value[1].error)){
			return
		}
		data.forEach(e=>{
			feedbackData[e[0]] = e[1].data
		})
		// let response = await fetch('https://my-json-server.typicode.com/anaistat/test_server/statuses', {
		// 	method: 'POST',
		// 	headers: {
		// 		'Content-type': 'application/json; charset=UTF-8'
		// 	},
		// 	body: JSON.stringify(feedbackData)
		// })
		// Фэйковый сервер не работает с POST запросом, поэтому я написала GET для обработки статусов ответов

		let response = await fetch('https://my-json-server.typicode.com/anaistat/test_server/statuses', {
			method: 'GET'
		})
		let result = await response.json()
		if(result[0].status === 'success'){
			setFetchStatus(FetchStatus.Success)
			setServerResponse(result[0].message)
		}

	}

	useEffect(()=>{
		if(fetchStatus === FetchStatus.Nothing || fetchStatus === FetchStatus.Sending){
			setServerResponse('')
		}
	}, [fetchStatus])


	return (
		<FormContext.Provider value={ { updateField, fetchStatus, setFetchStatus } }>
			<form className='feedback-form' onSubmit={sendForm}>
				<NameSurname name='name-surname'/>
				<Email name='email'/>
				<Number name='number'/>
				<DateOfBirth name='date-of-birth'/>
				<Message name='message'/>
				<button className='send-form' disabled={(fetchStatus === FetchStatus.Sending)}>Send</button>
				<p className='server-response'>{serverResponse}</p>
			</form>
		</FormContext.Provider>
	)
}

export default FeedbackForm