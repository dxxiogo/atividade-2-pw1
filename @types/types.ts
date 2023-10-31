export type Technology = {
    id: string
	title: string
	studied: boolean
	deadline: Date
	created_at: Date
}

export type User = {
    id: string
    name: string
    username: string
    technologies: Technology[]
}