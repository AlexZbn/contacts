import { Contact, IContact, IReducerAction, actionTypes } from "..";

import { initialContactList } from "./initialContactList";

export function readContactAction(): IReducerAction {
	// If there was backed then contact list would be requested here
	return { type: actionTypes.refreshContactsAction, payload: initialContactList };
}

export function applyContactChangesAction(contactData: IContact): IReducerAction {
	// If there was backed then changed/new contact would be sent here
	return { type: actionTypes.applyContactChangesAction, payload: contactData };
}

export function applyContactChangesAndStartNewContactAction(contactData: IContact) {
	return { type: actionTypes.applyContactChangesAndStartNewContactAction, payload: contactData };
}

export function removeContactAction(contact: Contact): IReducerAction {
	return { type: actionTypes.removeContactAction, payload: contact };
}

export function selectContactAction(contact: Contact): IReducerAction {
	return { type: actionTypes.selectContactAction, payload: contact };
}

export function startEditingAction(contact: Contact): IReducerAction {
	return { type: actionTypes.startEditingAction, payload: contact };
}

export function startNewContactAction(): IReducerAction {
	return { type: actionTypes.startNewContactAction };
}

export function errorWasHandled(): IReducerAction {
	return { type: actionTypes.errorWasHandled };
}

export function thereArePendingChanges(): IReducerAction {
	return { type: actionTypes.thereArePendingChanges };
}

export function cancelEditing(): IReducerAction {
	return { type: actionTypes.cancelEditing };
}