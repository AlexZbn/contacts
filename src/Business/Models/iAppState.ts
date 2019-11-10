import { Contact, IContact } from "..";

export enum AppMode { view, edit, create }

export interface IAppState {
	contacts: Contact[];
	selectedContact?: Contact;
	appMode: AppMode;
	newContactInitialState?: IContact;
	error?: string;
	thereAreDataChanges: boolean;
};