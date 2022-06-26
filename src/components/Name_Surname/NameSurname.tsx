import React, { ChangeEvent, FC, useCallback, useContext, useEffect, useState } from 'react'
import './NameSurname.sass'
import FormContext from '../../context/form.context'
import { FieldData } from '../../types'

const NameSurname:FC<{ name: string }> = ({ name }) => {

	const { updateField } = useContext(FormContext)
	const [data, setData] = useState<FieldData>({
		name,
		error: '',
		data: ''
	})

	const regName:RegExp = new RegExp(/^\S+[\s]\S+$/)

	const nameHandler = useCallback((event: ChangeEvent<HTMLInputElement>) =>{
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


	return (
		<div>
			<input type="text" className='inputs name-input' placeholder='Name and Surname' value={data.data} onChange={e=>nameHandler(e)}/>
			<p className={`error-message ${data.error?'error-message--visible':''}`}>{data.error}</p>
		</div>
	)
}

export default NameSurname