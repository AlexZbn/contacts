import { AppMode, Contact, IAppState, IContact, IReducerAction, actionTypes } from "..";

export const defaultState = { contacts: [], appMode: AppMode.view, thereAreDataChanges: false };

export function appStateReducer(state: IAppState, action: IReducerAction): IAppState {
	// Reducers should provide new state every time, need to avoid object mutations
	let nextState: IAppState = {...state};
	nextState = contactListManagementReducer(nextState, action);
	nextState = contactManagementReducer(nextState, action);
	nextState = appModeReducer(nextState, action);
	return nextState;
}

function contactListManagementReducer(state: IAppState, action: IReducerAction): IAppState{
	switch(action.type) {
		case actionTypes.refreshContactsAction: 
			const contacts: Contact[] = action.payload;
			state.contacts = contacts;
			state.appMode = AppMode.view;
			state.error = undefined;
			state.newContactInitialState = undefined;
			state.thereAreDataChanges = false;
			return state;
		case actionTypes.removeContactAction:
			if(state.appMode === AppMode.edit) {
				const contactToRemove: Contact = action.payload;
				const index = state.contacts.indexOf(contactToRemove);
				state.contacts = state.contacts.reduce((prev, c) => { c.id !== contactToRemove.id && prev.push(c); return prev; }, [] as Contact[]);
				if (index >= 0 && index < state.contacts.length) {
					state.selectedContact = state.contacts[index];
				}
				else if (index - 1 > 0) {
					state.selectedContact = state.contacts[index - 1];
				}
				else {
					state.selectedContact = undefined;
				}
			}

			state.error = undefined;
			state.newContactInitialState = undefined;
			state.appMode = AppMode.view;
			state.thereAreDataChanges = false;
			return state;
		case actionTypes.selectContactAction:
			if (state.appMode === AppMode.view) {
				const contactToSelect: Contact = action.payload;
				const selectedContact = state.contacts.find(c => c === contactToSelect);
				if(selectedContact) {
					state.selectedContact = selectedContact;
				}
			}

			return state;
		default: 
			return state;
	}
}

function contactManagementReducer(state: IAppState, action: IReducerAction): IAppState {
	switch(action.type) {
		case actionTypes.applyContactChangesAction:
			const contactParams: IContact = action.payload;
			applyContactChanges(state, contactParams);
			return state;
		case actionTypes.applyContactChangesAndStartNewContactAction:
			const contactParams1: IContact = action.payload;
			applyContactChanges(state, contactParams1) 
			&& startNewContact(state);
			return state;
		case actionTypes.errorWasHandled:
			state.error = undefined;
			return state;
		case actionTypes.thereAreDataChanges:
			state.thereAreDataChanges = true;
			return state;
		default: 
			return state;
	}
}

function appModeReducer(state: IAppState, action: IReducerAction): IAppState{
	switch(action.type) {
		case actionTypes.startEditingAction:
			if (state.appMode === AppMode.view) {
				const contactToEdit: Contact = action.payload;
				state.selectedContact = contactToEdit;
				state.appMode = AppMode.edit;
			}

			return state;
		case actionTypes.startNewContactAction:
			startNewContact(state);
			return state;
		case actionTypes.cancelEditing:
			state.appMode = AppMode.view;
			state.error = undefined;
			state.newContactInitialState = undefined;
			state.thereAreDataChanges = false;
			return state;
		default: 
			return state;
	}
}

function applyContactChanges(state: IAppState, contactData: IContact): boolean {
	const contact = new Contact(contactData);
	if (!contact.isValid) {
		state.error = "Invalid contact data. Please, fix invalid values.";
		return false;
	}
	else {
		if (state.appMode === AppMode.edit) {
		state.contacts = state.contacts.map(c=>c.id === contact.id ? contact : c);
		state.selectedContact = contact;
		}
		else if (state.appMode === AppMode.create) {
			// In the app with backend id would be assigned by the backed
			const maxId = state.contacts.reduce((maxId, c)=> c.id && maxId < c.id ? c.id : maxId, 0);
			contact.id = maxId + 1;
			state.contacts = [...state.contacts, contact];
			state.selectedContact = contact;
		}

		state.error = undefined;
		state.newContactInitialState = undefined;
		state.appMode = AppMode.view;
		state.thereAreDataChanges = false;
		return true;
	}
}

function startNewContact(state: IAppState) {
	if (state.appMode === AppMode.view) {
		state.appMode = AppMode.create;
		state.newContactInitialState = {};
	}
}