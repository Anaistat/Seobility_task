import React, { ChangeEvent, FC, useCallback, useContext, useEffect, useState } from 'react'
import './Email.sass'
import FormContext from '../../context/form.context'
import { FieldData, FormStatus } from '../../types'

const Email:FC<{ name: string }> = ({ name }) => {

	const { updateField, formStatus } = useContext(FormContext)
	const [data, setData] = useState<FieldData>({
		name,
		error: '',
		data: ''
	})

	let emailRegex:RegExp = new RegExp(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/)

	const emailHandler = useCallback((event: ChangeEvent<HTMLInputElement>) =>{
		let error = ''
		const data = event.target.value
		if(!emailRegex.test(data)){
			error = 'Incorrect email value'
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
			<input type='email' className='inputs' placeholder='Email' value={data.data} onChange={e=>emailHandler(e)}/>
			<p className={`error-message ${data.error?'error-message--visible':''}`}>{data.error}</p>
		</div>
	)
}

export default Email