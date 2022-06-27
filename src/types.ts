export type FieldData = {
	name: string
	error: string
	data: string
}

export enum FormStatus {
	Init,
	Correct,
	Sending,
	Success,
	Error
}