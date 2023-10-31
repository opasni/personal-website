type Recipient = {
	title: string;
	firstName: string;
	lastName: string;
	nickName: string;
	street: string;
	city: string;
}

export type CoverLetter = {
	recipient: Recipient;
	content: string[];
	regards: string;
}