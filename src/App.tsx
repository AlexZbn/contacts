import './App.css';

import { AppMode, appStateReducer, defaultState } from './Business';
import React, { useEffect, useReducer } from 'react';

import { ContactEditor } from './Components/contactEditor';
import { ContactList } from './Components/contactList';
import { ContactViewer } from './Components/contactViewer';
import { readContactAction } from './Business/Reducers/actionCreators';

const App: React.FC = () => {
	const [state, dispatch] = useReducer(appStateReducer, defaultState);
	useEffect(() => dispatch(readContactAction()), [dispatch]);

	return (
		<div className="app">
			<div className={"contacts-list-panel"}>
				<ContactList contacts={state.contacts} selectedContact={state.selectedContact} appMode={state.appMode} thereAreDataChanges={state.thereAreDataChanges} dispatch={dispatch} />
			</div>
			<div className={"contact-details-panel"}>
				{ state.appMode === AppMode.view
					? <ContactViewer contact={state.selectedContact!} dispatch={dispatch} />
					: <ContactEditor contact={state.appMode === AppMode.edit ? state.selectedContact : state.newContactInitialState!} appMode={state.appMode} 
									dispatch={dispatch} error={state.error} />
				}
			</div>
		</div>
	);
}

export default App;