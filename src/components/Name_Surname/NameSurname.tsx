import React, { ChangeEvent, FC, useCallback, useContext, useEffect, useState } from 'react'
import './NameSurname.sass'
import FormContext from '../../context/form.context'
import { FetchStatus, FieldData } from '../../types'

const NameSurname:FC<{ name: string }> = ({ name }) => {

	const { updateField, fetchStatus, setFetchStatus } = useContext(FormContext)
	const [data, setData] = useState<FieldData>({
		name,
		error: '',
		data: ''
	})

	const regName:RegExp = new RegExp(/^\S+[A-ZА-ЯЁ]{2,30}[\s][A-ZА-ЯЁ]{2,30}\S+$/)

	const nameHandler = useCallback((event: ChangeEvent<HTMLInputElement>) =>{
		setFetchStatus(FetchStatus.Nothing)
		let error = ''

		const data = event.target.value.toUpperCase()
		if(!regName.test(data)){
			error = 'Incorrect name value'
		}
		setData( { name, error, data })
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
			<input type="text" className='inputs name-input' placeholder='Name and Surname' value={data.data} onChange={e=>nameHandler(e)}/>
			<p className={`error-message ${data.error?'error-message--visible':''}`}>{data.error}</p>
		</div>
	)
}

export default NameSurname