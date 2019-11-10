import { Contact, IReducerAction, startEditingAction, startNewContactAction } from "../Business";

import React from "react";

export interface IContactViewerProps {
	contact: Contact;
	dispatch(action: IReducerAction): void
}

function ContactDataItem(props: {label: string, children: any}) {
	return <div className={"details-item"}><div className={"label"}>{props.label}</div><div className={"value"}>{props.children}</div></div>
}

export const ContactViewer: React.FC<IContactViewerProps> = (props) => {
	const {contact, dispatch} = props;

	return (
		<>
			<div className={"contact-details-container"}>
				{!contact 
				? <div>Not selected</div> 
				: <>
					<div className={"contact-full-name-block"}>
						<p className={"contact-full-name"}>{contact.fullName}</p>
					</div>
					<ContactDataItem label="phone">{contact.phone}</ContactDataItem>
					<ContactDataItem label="email"><a href="mailto:adam.acer@gmail.com">{contact.email}</a></ContactDataItem>
					<ContactDataItem label="address">{contact.address}</ContactDataItem>
					<ContactDataItem label="note">{contact.note}</ContactDataItem>
				</>
				}
			</div>
			<div className={"action-buttons-container"}>
				<button className={"action-button left-action-button add-button"} onClick={() => dispatch(startNewContactAction())}>+</button>
				<button className={"action-button right-action-button"} onClick={() => dispatch(startEditingAction(contact))} disabled={!contact}>Edit</button>
			</div>
		</>
	);
}