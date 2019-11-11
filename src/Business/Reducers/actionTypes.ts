export const actionTypes: {
	readonly refreshContactsAction: string,
	readonly applyContactChangesAction: string,
	readonly removeContactAction: string,
	readonly selectContactAction: string,
	readonly startEditingAction: string,
	readonly startNewContactAction: string,
	readonly applyContactChangesAndStartNewContactAction: string;
	readonly errorWasHandled: string;
	readonly thereArePendingChanges: string;
	readonly cancelEditing: string;
} = {
	refreshContactsAction: "refreshContacts",
	applyContactChangesAction: "applyContactChanges",
	removeContactAction: "removeContact",
	selectContactAction: "selectContact",
	startEditingAction: "startEditing",
	startNewContactAction: "startNewContact",
	applyContactChangesAndStartNewContactAction: "applyContactChangesAndStartNewContactAction",
	errorWasHandled: "errorWasHandled",
	thereArePendingChanges: "thereArePendingChanges",
	cancelEditing: "cancelEditing"
};