interface Recipient {
    title: string;
    firstName: string;
    lastName: string;
    nickName: string;
    street: string;
    city: string;
}

export interface CoverLetter {
    recipient: Recipient;
    content: string[];
    regards: string;
}
