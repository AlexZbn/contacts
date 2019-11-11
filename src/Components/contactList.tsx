import { AppMode, Contact, IReducerAction, selectContactAction } from "../Business";
import React, { useEffect, useMemo } from "react";

import { ContactListGroupItem } from "./contactListGroupItem";
import { ContactListItem } from "./contactListItem";

export interface IContactListProps {
	contacts: Contact[];
	selectedContact?: Contact;
	appMode: AppMode;
	thereAreDataChanges: boolean;
	dispatch(action: IReducerAction): void
};

export const ContactList: React.FC<IContactListProps> = (props) => {
	const { contacts, selectedContact, appMode, thereAreDataChanges, dispatch } = props;

	const sortedContacts = useMemo(() => contacts.sort(Contact.compareContacts), [contacts]);

	useEffect(() => {
		if (!selectedContact && contacts.length > 0) {
			dispatch(selectContactAction(contacts[0]));
		}
	}, [selectedContact, contacts, dispatch]);

	const listItems: React.ReactElement[] = [];
	let groupLabel: string | undefined;
	for (let contact of sortedContacts) {
		let currentGroupLabel = contact.lastName![0].toUpperCase();
		if (groupLabel !== currentGroupLabel) {
			groupLabel = currentGroupLabel;
			listItems.push(<ContactListGroupItem key={"gr" + currentGroupLabel}>{groupLabel}</ContactListGroupItem>);
		}
		listItems.push(<ContactListItem key={contact.id} contact={contact} isSelected={appMode !== AppMode.create && !!selectedContact && contact.id === selectedContact.id}
			appMode={appMode} dispatch={dispatch} thereAreDataChanges={thereAreDataChanges} />);
	}

	return (
		<div className={"contacts-list"}>
			{
				contacts.length === 0
					? <p className={"empty-contact-list-indicator"}>No contacts</p>
					: <ul>{listItems}</ul>
			}
		</div>
	);
}