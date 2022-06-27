import React, { FormEvent, useEffect, useState } from 'react'
import './FeedbackForm.sass'
import NameSurname from '../Name_Surname/NameSurname'
import Email from '../Email/Email'
import Number from '../Number/Number'
import DateOfBirth from '../DateOfBirth/DateOfBirth'
import Message from '../Message/Message'
import { FieldData, FormStatus } from '../../types'
import FormContext from '../../context/form.context'

interface Feedback{
	[key: string]: string
}

interface ServerResponse {
	status: 'error' | 'success'
	message: string
}

const FeedbackForm = () => {

	const [serverResponse, setServerResponse] = useState<ServerResponse | undefined>()
	const [formData, setFormData] = useState<Map<string, FieldData>>(new Map())
	const [formStatus, setFormStatus] = useState<FormStatus>(FormStatus.Init)

	const updateField = (data: FieldData) =>{
		setFormData(prevState => {
			const newMap: Map<string, FieldData> = new Map(Array.from(prevState))
			newMap.set(data.name, data)
			return newMap
		})
	}

	const clearForm = () => {
		setFormData(new Map())
	}

	useEffect(()=>{
		const data = Array.from(formData)
		if (data.some(e=>e[1].error || !e[1].data)) {
			return setFormStatus(FormStatus.Error)
		}
		setFormStatus(FormStatus.Correct)
	}, [formData])

	const sendForm = async (e: FormEvent<HTMLFormElement>) =>{
		e.preventDefault()
		setFormStatus(FormStatus.Sending)
		const data = Array.from(formData)
		let feedbackData: Feedback = {}
		if(data.some(value=>value[1].error || !value[1].data)){
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
		let result: ServerResponse[] = await response.json()
		setServerResponse(result[0])
	}

	useEffect(()=>{
		if(formStatus === FormStatus.Init || formStatus === FormStatus.Sending){
			setServerResponse(undefined)
		}
	}, [formStatus])

	const ServerMessage = () => {
		const styles = ['server-response']
		if (serverResponse) {
			styles.push(serverResponse.status === 'error'? 'server-response--error' : 'server-response--success')
		}
		return <p className={styles.join(' ')}>{ serverResponse?.message }</p>


	}


	return (
		<FormContext.Provider value={ { updateField, formStatus } }>
			<form className='feedback-form' onSubmit={sendForm}>
				<NameSurname name='name-surname'/>
				<Email name='email'/>
				<Number name='number'/>
				<DateOfBirth name='date-of-birth'/>
				<Message name='message'/>
				<button className='send-form' disabled={(formStatus !== FormStatus.Correct && formStatus !== FormStatus.Success)}>Send</button>
				<ServerMessage/>
			</form>
		</FormContext.Provider>
	)
}

export default FeedbackForm