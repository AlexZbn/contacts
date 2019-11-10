import { IContact, ValidationRules } from "..";

export class Contact implements IContact {
	constructor(contact?: IContact) {
		if(contact) {
			this.id = contact.id;
			this.firstName = contact.firstName;
			this.lastName = contact.lastName;
			this.phone = contact.phone;
			this.email = contact.email;
			this.address = contact.address;
			this.note = contact.note;
		}
	}

	public id?: number; // Can be undefined for new contacts until they are not saved on server
	public firstName?: string;
	public lastName?: string
	public phone?: string;
	public email?: string;
	public address?: string;
	public note?: string;

	public get fullName(): string | undefined {
		return this.lastName
			? `${this.firstName} ${this.lastName}`
			: this.firstName ? this.firstName : undefined;
	}

	public get isValid(): boolean {
		return ValidationRules.isFirstNameValid(this.firstName)
			&& ValidationRules.isLastNameValid(this.lastName)
			&& ValidationRules.isPhoneValid(this.phone)
			&& ValidationRules.isEmailValid(this.email)
			&& ValidationRules.isAddressValid(this.address)
			&& ValidationRules.isNoteValid(this.note);
	}

	public static compareContacts(contact1: Contact, contact2: Contact): number {
		let name1 = contact1.lastName!.toLowerCase();
		let name2 = contact2.lastName!.toLowerCase();
		
		if (name1 === name2) {
			return 0;
		}
		if (name1 < name2) {
			return -1;
		}
		else {
			return 1;
		}
	}
}