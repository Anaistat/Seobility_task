import React, { ChangeEvent, FC, useCallback, useContext, useEffect, useState } from 'react'
import './Number.sass'
import FormContext from '../../context/form.context'
import { FieldData, FormStatus } from '../../types'

const Number:FC<{ name: string }> = ({ name }) => {

	const { updateField, formStatus } = useContext(FormContext)
	const [data, setData] = useState<FieldData>({
		name,
		error: '',
		data: ''
	})

	const phoneRegex:RegExp = new RegExp(/^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/)
	const phoneHandler = useCallback((event: ChangeEvent<HTMLInputElement>) =>{
		let error = ''

		const data = event.target.value
		if(!phoneRegex.test(data)){
			error = 'Incorrect phone value'
		}
		setData( { name, error, data: data })
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
			<input type='number' className='inputs' name='phone' placeholder='+7' value={data.data} onChange={e=>phoneHandler(e)}/>
			<p className={`error-message ${data.error?'error-message--visible':''}`}>{data.error}</p>
		</div>
	)
}

export default Number