import React, { useState } from 'react'
import './Message.sass'

const Message = () => {

	const [text, setText] = useState<string>('')
	const countStyle = {
		normal: 'letter-count',
		outOfRange: 'out-of-range'
	}

	return (
		<div>
			<textarea name='message' className='message' placeholder='Message...' cols={60} rows={10} value={text} onChange={e=>setText(e.target.value)}/>
			<p className={`${text.length < 10 || text.length > 300? countStyle.outOfRange: countStyle.normal}`}>{text.length}<span className='letter-count'>/300</span></p>
		</div>
	)
}

export default Message