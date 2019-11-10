import { AppMode, IContact, IReducerAction, applyContactChangesAction } from "../Business";
import React, { useEffect, useState } from "react";
import { applyContactChangesAndStartNewContactAction, errorWasHandled, thereAreDataChanges } from "../Business/Reducers/actionCreators";

import { TextInputField } from "./Controls/textInputField";
import { ValidationRules } from "../Business/Models/validationRules";

export interface IContactEditorProps {
	contact?: IContact;
	appMode: AppMode;
	error?: string;
	dispatch(action: IReducerAction): void;
}

function ContactDataItem(props: {label: string, children: any}) {
	return (
		<div className={"details-item"}>
			<div className={"label"}>{props.label}</div>
			<div className={"value"}>{props.children}</div>
		</div>
	);
}

export const ContactEditor: React.FC<IContactEditorProps> = (props) => {
	const {contact, error, dispatch} = props;
	const [firstName, setFirstName] = useState<string | undefined>();
	const [lastName, setLastName] = useState<string | undefined>();
	const [phone, setPhone] = useState<string | undefined>();
	const [email, setEmail] = useState<string | undefined>();
	const [address, setAddress] = useState<string | undefined>();
	const [note, setNote] = useState<string | undefined>();
	const [needToValidateInput, setNeedToValidateInput] = useState<true | undefined>();
	//const [focusTrigger, updateFocusTrigger] = useState(true);

	useEffect(()=>{
		if (error) {
			window.alert(error);
			setNeedToValidateInput(true);
			dispatch(errorWasHandled());
		}
	}, [error, dispatch, setNeedToValidateInput]);

	useEffect(() => {
		setFirstName(contact && contact.firstName);
		setLastName(contact && contact.lastName);
		setPhone(contact && contact.phone);
		setEmail(contact && contact.email);
		setAddress(contact && contact.address);
		setNote(contact && contact.note);
		setNeedToValidateInput(undefined);
	}, [contact]);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		const contactData: IContact = {
			id: contact && contact.id,
			firstName: firstName,
			lastName: lastName,
			phone: phone,
			email: email,
			address: address,
			note: note
		};
		dispatch(applyContactChangesAction(contactData));
		e.preventDefault();
	};

	const handleCreateButtonClick = () => {
		const contactData: IContact = {
			id: contact && contact.id,
			firstName: firstName,
			lastName: lastName,
			phone: phone,
			email: email,
			address: address,
			note: note
		};
		dispatch(applyContactChangesAndStartNewContactAction(contactData));
	};

	return (
		<form className={"contact-editor-form"} onSubmit = {handleSubmit}>
			<div className={"contact-details-container"}>
				<div className={"contact-full-name-block"}>
					<div className={"first-name-edit-block"}>
						<TextInputField name="firstName" value={firstName} className={"contact-input-field full-name-edit-field"} 
										invalidClassName={"contact-input-field-invalid-value"} valueChanged={(value) => {setFirstName(value); dispatch(thereAreDataChanges());}}
										validate={needToValidateInput && ValidationRules.isFirstNameValid} autoFocus={true} />
						<label className="label full-name-label">first name</label>						
					</div>
					<div className={"last-name-edit-block"}>
						<TextInputField name="lastName" value={lastName} className={"contact-input-field full-name-edit-field"} 
										invalidClassName={"contact-input-field-invalid-value"} valueChanged={(value) => {setLastName(value); dispatch(thereAreDataChanges());}} 
										validate={needToValidateInput && ValidationRules.isLastNameValid} />
						<label className="label full-name-label">last name</label>				
					</div>
				</div>
				<div>
					<ContactDataItem label="phone">
						<TextInputField name="phone" value={phone} className={"contact-input-field"} invalidClassName={"contact-input-field-invalid-value"} 
										valueChanged={(value) => {setPhone(value); dispatch(thereAreDataChanges());}} 
										validate={needToValidateInput && ValidationRules.isPhoneValid} />
					</ContactDataItem>
					<ContactDataItem label="email">
						<TextInputField name="email" value={email} className={"contact-input-field"} invalidClassName={"contact-input-field-invalid-value"} 
										valueChanged={(value) => {setEmail(value); dispatch(thereAreDataChanges());}} 
										validate={needToValidateInput && ValidationRules.isEmailValid} />
					</ContactDataItem>
					<ContactDataItem label="address">
						<TextInputField name="address" value={address} className={"contact-input-field"} invalidClassName={"contact-input-field-invalid-value"} 
										valueChanged={(value) => {setAddress(value); dispatch(thereAreDataChanges());}} 
										validate={needToValidateInput && ValidationRules.isAddressValid} rows={3} />
					</ContactDataItem>
					<ContactDataItem label="note">
						<TextInputField name="note" value={note} className={"contact-input-field"} invalidClassName={"contact-input-field-invalid-value"} 
										valueChanged={(value) => {setNote(value); dispatch(thereAreDataChanges());}} 
										validate={needToValidateInput && ValidationRules.isNoteValid} rows={3}/>
					</ContactDataItem>
				</div>
			</div>
			<div className={"action-buttons-container"}>
				<button className={"action-button left-action-button add-button"} onClick={handleCreateButtonClick} type="button">+</button>
				<button className={"action-button right-action-button"} type="submit">Done</button>
			</div>
		</form>
	);
}