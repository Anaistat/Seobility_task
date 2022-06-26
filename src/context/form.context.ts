import { createContext } from 'react'
import { FieldData } from '../types'

interface FormContextInterface{
	updateField: (data: FieldData) => void
}

const FormContext = createContext<FormContextInterface>({
	updateField: data => {}
})

export default FormContext