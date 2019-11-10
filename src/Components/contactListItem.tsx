import { AppMode, Contact, IReducerAction, cancelEditing, removeContactAction, selectContactAction } from "../Business";
import React, { useCallback } from "react";

export interface IContactListItemProps {
	contact: Contact;
	isSelected: boolean;
	appMode: AppMode;
	thereAreDataChanges: boolean;
	dispatch(action: IReducerAction): void
};

export const ContactListItem: React.FC<IContactListItemProps> = (props) => {
	const { contact, isSelected, appMode, thereAreDataChanges, dispatch } = props;

	const removeButtonClickHandler = useCallback(()=> {
		if (window.confirm(`Are you sure you want to remove '${contact.fullName}'`)) {
			dispatch(removeContactAction(contact));
		}
	}, [contact, dispatch]);

	const contactClickHandler = useCallback(()=> {
		if (thereAreDataChanges) {
			if (thereAreDataChanges && window.confirm("Discard changes?")) {
				dispatch(cancelEditing());
				dispatch(selectContactAction(contact));
			}
		}
		else {
			dispatch(cancelEditing());
			dispatch(selectContactAction(contact));
		}
	}, [contact, dispatch, thereAreDataChanges]);

	return (
		isSelected 
		? <li className={"contacts-list-item-selected"}>
			{contact.fullName}
			{appMode === AppMode.edit && <button className={"inline-circle-button minus-button"} onClick={removeButtonClickHandler}>-</button>}
		  </li>
		: <li className={"contacts-list-item"} onClick={contactClickHandler}>{contact.fullName}</li>
	);
}