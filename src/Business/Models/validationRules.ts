export class ValidationRules {
	public static minEmailLength: number = 8;
	public static maxEmailLength: number = 320;
	public static minPhoneLength: number = 8;
	public static maxPhoneLength: number = 20;
	public static maxAddressLength: number = 1024;
	public static maxNoteLength: number = 1024;
	public static maxFirstNameLength: number = 50;
	public static maxLastNameLength: number = 50;

	public static isFirstNameValid(firstName: string | undefined) {
		return !!firstName && firstName.length <= ValidationRules.maxFirstNameLength
	}

	public static isLastNameValid(lastName: string | undefined) {
		return !!lastName && lastName.length <= ValidationRules.maxLastNameLength
	}

	public static isPhoneValid(phone: string | undefined) {
		if (!phone) {
			return true;
		}
		else {
			return phone.length >= ValidationRules.minPhoneLength
				&& phone.length <= ValidationRules.maxPhoneLength
				&& /^\+?[0-9]{1,3}? *(?:\(?[0-9]{1,3}\)?)?[0-9 .-]{5,20}$/.test(phone)
		}
	}

	public static isEmailValid(email: string | undefined) {
		if (!email) {
			return true;
		}
		else {
			return email.length >= ValidationRules.minEmailLength
				&& email.length <= ValidationRules.maxEmailLength
				&& /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email);
		}
	}

	public static isAddressValid(address: string | undefined) {
		if (!address) {
			return true;
		}
		else {
			return address.length <= ValidationRules.maxAddressLength;
		}
	}

	public static isNoteValid(note: string | undefined) {
		if (!note) {
			return true;
		}
		else {
			return note.length <= ValidationRules.maxNoteLength;
		}
	}
}