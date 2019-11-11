import { Contact } from "..";

let idCounter: number = 1;
export const initialContactList: Contact[] = [
	new Contact({ id: idCounter++, firstName: "L", lastName: "Z" }),
	new Contact({ id: idCounter++, firstName: "Adam", lastName: "Acer", phone: "399-692-7753", email: "adam.acer@gmail.com", address: "99 Weiland Way\nCupertino CA 95014\nUnited States", note: "Adam's California address" }),
	new Contact({ id: idCounter++, firstName: "H", lastName: "R" }),
	new Contact({ id: idCounter++, firstName: "Scott", lastName: "Anderson", phone: "+1 (360) 692-7753", email: "scott.anderson@gmail.com", address: "Address1", note: "Note1" }),
	new Contact({ id: idCounter++, firstName: "Mary", lastName: "Arthur", phone: "234324324", email: "mary.arthur@gmail.com" }),
	new Contact({ id: idCounter++, firstName: "Stuart", lastName: "Asmussen" }),
	new Contact({ id: idCounter++, firstName: "Trevor", lastName: "Atwater" }),
	new Contact({ id: idCounter++, firstName: "E", lastName: "P" }),
	new Contact({ id: idCounter++, firstName: "K", lastName: "T" }),
	new Contact({ id: idCounter++, firstName: "Siobhan", lastName: "Auchulter" }),
	new Contact({ id: idCounter++, firstName: "G", lastName: "R" }),
	new Contact({ id: idCounter++, firstName: "Mac", lastName: "Barter" }),
	new Contact({ id: idCounter++, firstName: "A", lastName: "E" }),
	new Contact({ id: idCounter++, firstName: "J", lastName: "T" }),
	new Contact({ id: idCounter++, firstName: "F", lastName: "P" }),
	new Contact({ id: idCounter++, firstName: "Neal", lastName: "Becker" }),
	new Contact({ id: idCounter++, firstName: "Jeremy", lastName: "Asmussen" }),
	new Contact({ id: idCounter++, firstName: "Stuart", lastName: "Bee" }),
	new Contact({ id: idCounter++, firstName: "Gregor von", lastName: "Bingen" }),
	new Contact({ id: idCounter++, firstName: "C", lastName: "L" }),
	new Contact({ id: idCounter++, firstName: "I", lastName: "T" }),
	new Contact({ id: idCounter++, firstName: "Maxwell", lastName: "Broca" }),
	new Contact({ id: idCounter++, firstName: "D", lastName: "L" }),
	new Contact({ id: idCounter++, firstName: "Reena", lastName: "Bushanda" }),
	new Contact({ id: idCounter++, firstName: "Harold", lastName: "Curtis" }),
	new Contact({ id: idCounter++, firstName: "B", lastName: "E" }),
	new Contact({ id: idCounter++, firstName: "Maxine", lastName: "Cromwell" })
];