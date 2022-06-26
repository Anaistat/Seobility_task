import React, { ChangeEvent, FC, useCallback, useContext, useEffect, useState } from 'react'
import './Message.sass'
import FormContext from '../../context/form.context'
import { FieldData } from '../../types'

const Message:FC<{name: string}> = ({ name }) => {

	const countStyle = {
		normal: 'letter-count',
		outOfRange: 'out-of-range'
	}

	const { updateField } = useContext(FormContext)
	const [data, setData] = useState<FieldData>({
		name,
		error: '',
		data: ''
	})

	const messageHandler = useCallback((event: ChangeEvent<HTMLTextAreaElement>) =>{
		let error = ''

		const data = event.target.value
		if(data.length < 10 || data.length > 300){
			error = 'Incorrect message value'
		}
		setData( { name, error, data })
	}, [])

	useEffect(()=>{
		updateField(data)
	}, [data])



	return (
		<div>
			<textarea name='message' className='message' placeholder='Message...' cols={60} rows={10} value={data.data} onChange={e=>messageHandler(e)}/>
			<p className={`${data.data.length < 10 || data.data.length > 300? countStyle.outOfRange: countStyle.normal}`}>{data.data.length}<span className='letter-count'>/300</span></p>
		</div>
	)
}

export default Message