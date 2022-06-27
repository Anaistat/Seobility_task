export type FieldData = {
	name: string
	error: string
	data: string
}

export enum FetchStatus {
	Nothing,
	Sending,
	Success,
	Error
}