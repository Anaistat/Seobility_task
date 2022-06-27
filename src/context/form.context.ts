import { createContext, Dispatch, SetStateAction } from 'react'
import { FetchStatus, FieldData } from '../types'

interface FormContextInterface{
	updateField: (data: FieldData) => void
	fetchStatus: FetchStatus
	setFetchStatus: Dispatch<SetStateAction<FetchStatus>>
}

const FormContext = createContext<FormContextInterface>({
	updateField: data => {},
	fetchStatus: FetchStatus.Nothing,
	setFetchStatus: () => {}
})

export default FormContext