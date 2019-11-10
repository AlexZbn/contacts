import React from "react";

export interface IContactListItemProps {
	children: any;
};

export const ContactListGroupItem: React.FC<IContactListItemProps> = (props) => {
	return <li className={"contacts-list-group-title"}>{props.children}</li>;
}