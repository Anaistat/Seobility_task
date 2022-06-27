import React, { ChangeEvent, FC, useCallback, useContext, useEffect, useState } from 'react'
import './Number.sass'
import FormContext from '../../context/form.context'
import { FetchStatus, FieldData } from '../../types'

const Number:FC<{ name: string }> = ({ name }) => {

	const { updateField, fetchStatus, setFetchStatus } = useContext(FormContext)
	const [data, setData] = useState<FieldData>({
		name,
		error: '',
		data: ''
	})

	const phoneRegex:RegExp = new RegExp(/^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/)
	const phoneHandler = useCallback((event: ChangeEvent<HTMLInputElement>) =>{
		setFetchStatus(FetchStatus.Nothing)
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
		if(fetchStatus === FetchStatus.Success){
			setData({
				name,
				error: '',
				data: ''
			})
		}
	}, [fetchStatus])


	return (
		<div>
			<input type='number' className='inputs' name='phone' placeholder='+7' value={data.data} onChange={e=>phoneHandler(e)}/>
			<p className={`error-message ${data.error?'error-message--visible':''}`}>{data.error}</p>
		</div>
	)
}

export default Number