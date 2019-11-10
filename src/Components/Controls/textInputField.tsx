import React, { BaseSyntheticEvent, FunctionComponent, useCallback, useEffect, useState } from "react";

export interface ITextInputFieldProps {
	value?: string;
	name: string;
	autoFocus?: boolean;
	placeholder?: string;
	className: string;
	invalidClassName :string;
	rows?: number;
	valueChanged(text?: string): void;
	validate?: (text?: string) => boolean;
}

export const TextInputField: FunctionComponent<ITextInputFieldProps> = (props) => {
	const { value, name, autoFocus, placeholder, className, invalidClassName, rows, valueChanged, validate} = props;
	const [text, setText] = useState<string>("");
	const [isValid, setValidFlag] = useState(true);

	useEffect(()=> {
		setText(value || "");
	}, [value, setText]);

	useEffect(()=> {
		validate && setValidFlag(validate(text))
	}, [validate, text, setValidFlag]);

	const textChangedHandler = useCallback((e: BaseSyntheticEvent) => {
		setText(e.target.value);
		if(validate) {
			setValidFlag(validate(e.target.value || undefined));
		}
	}, [setText, validate, setValidFlag]);

	const onBlurHandler = (e: BaseSyntheticEvent) => {
		const newValue = text || undefined;
		if(value !== newValue) {
			valueChanged(newValue);
		}
	};

	const onKeyDownHandler = (e: React.KeyboardEvent) => {
		if (e.key === "Enter") {
			const newValue = text || undefined;
			if(value !== newValue) {
				valueChanged(newValue);
			}
		}
	};

	return (
		!rows || rows < 2
		? <input
			type = "text"
			name = {name}
			autoFocus = {autoFocus}
			className = {isValid ? className : className + " " + invalidClassName}
			value = {text}
			placeholder = {placeholder} 
			onChange = {textChangedHandler}
			onBlur = {onBlurHandler}
			onKeyDown = {onKeyDownHandler} />
		: <textarea
			name = {name}
			autoFocus = {autoFocus}
			className = {isValid ? className : className + " " + invalidClassName}
			value = {text}
			placeholder = {placeholder}
			rows = {rows} 
			onChange = {textChangedHandler}
			onBlur = {onBlurHandler}
			onKeyDown = {onKeyDownHandler}/>
	);
}