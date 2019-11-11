import { AppMode, IContact, appStateReducer, applyContactChangesAction, cancelEditing, defaultState, readContactAction, removeContactAction, selectContactAction, startEditingAction, startNewContactAction, thereArePendingChanges } from '../Business';

it("Reducer.readContactAction: adds contacts into app state", () => {
	let nextState = appStateReducer(defaultState, {type: "init"});
	nextState = appStateReducer(nextState, readContactAction());

	expect(nextState.appMode).toBe(AppMode.view);
	expect(nextState.contacts.length).toBeGreaterThan(0);
	expect(nextState.error).toBe(undefined);
	expect(nextState.newContactInitialState).toBe(undefined);
	expect(nextState.selectedContact).toBe(undefined);
	expect(nextState.thereArePendingChanges).toBe(false);
});

it("Reducer.selectContactAction: makes a specified contact selected", () => {
	let nextState = appStateReducer(defaultState, {type: "init"});
	nextState = appStateReducer(nextState, readContactAction());
	nextState = appStateReducer(nextState, selectContactAction(nextState.contacts[5]));

	expect(nextState.appMode).toBe(AppMode.view);
	expect(nextState.error).toBe(undefined);
	expect(nextState.selectedContact).toBe(nextState.contacts[5]);
});

it("Reducer.thereArePendingChanages: activates thereArePendingChanages flag", () => {
	let nextState = appStateReducer(defaultState, {type: "init"});
	nextState = appStateReducer(nextState, readContactAction());
	nextState = appStateReducer(nextState, thereArePendingChanges());

	expect(nextState.thereArePendingChanges).toBe(true);
	expect(nextState.appMode).toBe(AppMode.view);
	expect(nextState.error).toBe(undefined);

});

it("Reducer.startEditingAction: starts edit mode for the specified contact", () => {
	let nextState = appStateReducer(defaultState, {type: "init"});
	nextState = appStateReducer(nextState, readContactAction());
	nextState = appStateReducer(nextState, startEditingAction(nextState.contacts[5]));

	expect(nextState.appMode).toBe(AppMode.edit);
	expect(nextState.error).toBe(undefined);
	expect(nextState.selectedContact).toBe(nextState.contacts[5]);
});

it("Reducer.startEditingAction: starts create mode", () => {
	let nextState = appStateReducer(defaultState, {type: "init"});
	nextState = appStateReducer(nextState, startNewContactAction());

	expect(nextState.appMode).toBe(AppMode.create);
	expect(nextState.error).toBe(undefined);
});

it("Reducer.cancelEditingAction: resets edit/create mode to view mode", () => {
	let nextState = appStateReducer(defaultState, {type: "init"});
	nextState = appStateReducer(nextState, startNewContactAction());
	nextState = appStateReducer(nextState, cancelEditing());

	expect(nextState.appMode).toBe(AppMode.view);
	expect(nextState.error).toBe(undefined);
});

it("Reducer.removeContactAction: removes the specified contact and updates selectedContact field", () => {
	let nextState = appStateReducer(defaultState, {type: "init"});
	nextState = appStateReducer(nextState, readContactAction());
	const editingContact = nextState.contacts[5];
	nextState = appStateReducer(nextState, startEditingAction(editingContact));
	nextState = appStateReducer(nextState, removeContactAction(editingContact));

	expect(nextState.contacts.indexOf(editingContact)).toBe(-1);
	expect(nextState.appMode).toBe(AppMode.view);
	expect(nextState.error).toBe(undefined);
	expect(nextState.newContactInitialState).toBe(undefined);
	expect(nextState.selectedContact).not.toBe(editingContact);
	expect(nextState.newContactInitialState).toBe(undefined);
	expect(nextState.thereArePendingChanges).toBe(false);
});

it("Reducer.removeContactAction: removing works only in edit/create mode", () => {
	let nextState = appStateReducer(defaultState, {type: "init"});
	nextState = appStateReducer(nextState, readContactAction());
	const editingContact = nextState.contacts[5];
	nextState = appStateReducer(nextState, removeContactAction(editingContact));

	expect(nextState.contacts.indexOf(editingContact)).toBeGreaterThan(-1);
	expect(nextState.appMode).toBe(AppMode.view);
	expect(nextState.error).toBe(undefined);
});

it("Reducer.applyContactChangesAction: in edit mode validates new data and updates correspond contact by params from its argument", () => {
	const contactParams: IContact = {
		firstName: "updatedFirstName",
		lastName: "updatedLastName",
		phone: "987 654321",
		email: "updatedemail@test.com",
		address: "updated address",
		note: "updated note"
	};

	let nextState = appStateReducer(defaultState, {type: "init"});
	nextState = appStateReducer(nextState, readContactAction());
	const editingContact = nextState.contacts[5];
	contactParams.id =editingContact.id;
	nextState = appStateReducer(nextState, selectContactAction(editingContact));
	nextState = appStateReducer(nextState, startEditingAction(editingContact));
	nextState = appStateReducer(nextState, applyContactChangesAction(contactParams));

	expect(nextState.appMode).toBe(AppMode.view);
	expect(nextState.error).toBe(undefined);
	const updatedContact = nextState.contacts.find(c => c.id === editingContact.id);
	expect(updatedContact).not.toBe(undefined);
	expect(updatedContact!.firstName).toBe(contactParams.firstName);
	expect(updatedContact!.lastName).toBe(contactParams.lastName);
	expect(updatedContact!.email).toBe(contactParams.email);
	expect(updatedContact!.phone).toBe(contactParams.phone);
	expect(updatedContact!.email).toBe(contactParams.email);
	expect(updatedContact!.note).toBe(contactParams.note);
});

it("Reducer.applyContactChangesAction: if update params are invalid the doesn't update contact and indicates about error", () => {
	const contactParams: IContact = {
		firstName: "", // first name is required
		lastName: "updatedLastName",
		phone: "987 654321",
		email: "updatedemail@test.com",
		address: "updated address",
		note: "updated note"
	};

	let nextState = appStateReducer(defaultState, {type: "init"});
	nextState = appStateReducer(nextState, readContactAction());
	const editingContact = nextState.contacts[5];
	contactParams.id = editingContact.id;
	nextState = appStateReducer(nextState, selectContactAction(editingContact));
	nextState = appStateReducer(nextState, startEditingAction(editingContact));
	nextState = appStateReducer(nextState, applyContactChangesAction(contactParams));

	expect(nextState.appMode).toBe(AppMode.edit);
	expect(nextState.error).not.toBe(undefined);
	const contact = nextState.contacts.find(c => c.id === editingContact.id);
	expect(contact).not.toBe(undefined);
	expect(contact!.firstName).not.toBe(contactParams.firstName);
	expect(contact!.lastName).not.toBe(contactParams.lastName);
	expect(contact!.email).not.toBe(contactParams.email);
	expect(contact!.phone).not.toBe(contactParams.phone);
	expect(contact!.email).not.toBe(contactParams.email);
	expect(contact!.note).not.toBe(contactParams.note);
});