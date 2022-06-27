import { createContext, Dispatch, SetStateAction } from 'react'
import { FieldData, FormStatus } from '../types'

interface FormContextInterface{
	updateField: (data: FieldData) => void
	formStatus: FormStatus
}

const FormContext = createContext<FormContextInterface>({
	updateField: data => {},
	formStatus: FormStatus.Init,
})

export default FormContext