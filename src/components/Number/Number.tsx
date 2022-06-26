import React, { ChangeEvent, FC, useCallback, useContext, useEffect, useState } from 'react'
import './Number.sass'
import FormContext from '../../context/form.context'
import { FieldData } from '../../types'

const Number:FC<{ name: string }> = ({ name }) => {

	const { updateField } = useContext(FormContext)
	const [data, setData] = useState<FieldData>({
		name,
		error: '',
		data: ''
	})

	const phoneHandler = useCallback((event: ChangeEvent<HTMLInputElement>) =>{
		let error = ''

		const data = event.target.value
		if(false){
			error = 'Incorrect phone value'
		}
		setData( { name, error, data: data })
	}, [])

	useEffect(()=>{
		updateField(data)
	}, [data])


	return (
		<div>
			{/*<label htmlFor='phone' className='phone-mask'>+7</label>*/}
			<input type='number' className='inputs' name='phone' placeholder='Phone' value={data.data} onChange={e=>phoneHandler(e)}/>
			<p className={`error-message ${data.error?'error-message--visible':''}`}>{data.error}</p>
		</div>
	)
}

export default Number