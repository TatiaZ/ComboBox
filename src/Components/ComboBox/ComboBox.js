import React, { useState, useEffect, useRef } from 'react';
import { Clear, KeyboardArrowDown, KeyboardArrowUp } from '@material-ui/icons';
import useOutsideClick from './Hooks/useOutsideClick';
import './ComboBox.css';

export default function ComboBox({
	data,
	valueField,
	textField,
	disabled,
	placeholder,
	onSelectedItemChange
}) {
	const [dataToDisplay, setDataToDisplay] = useState(data);
	const [searchValue, setSearchValue] = useState(textField || '');
	const [listOpened, setListOpened] = useState(false);
	const inputRef = useRef(null);
	const { ref } = useOutsideClick(true, () => setListOpened(false));

	useEffect(() => {
		if (!listOpened && !searchValue) {
			onSelectedItemChange(null, null);
		}
	}, [listOpened]);

	useEffect(() => {
		if (valueField) {
			const selectedValue =
				data.find(item => item.valueField === valueField) || '';
			setSearchValue(selectedValue.textField);
		}
	}, [valueField]);

	const handleSearch = ({ target }) => {
		setSearchValue(target.value);
		filterData(target.value);
	};

	const handleItemClick = (e, item, index) => {
		e.preventDefault();
		e.stopPropagation();
		setSearchValue(item.textField);
		onSelectedItemChange(item.valueField, item.textField);
		setListOpened(false);
	};

	const filterData = value => {
		const filtered = value
			? data.filter(item =>
					item.textField.toLowerCase().startsWith(value.toLowerCase())
			  ) || []
			: data;
		setDataToDisplay(filtered);
	};

	const handleFocus = () => {
		if (!disabled) {
			inputRef.current.focus();
			setListOpened(listOpened => !listOpened);
		}
	};

	const handleClear = e => {
		e.stopPropagation();
		inputRef.current.focus();
		setSearchValue('');
		setListOpened(true);
		filterData('');
	};

	return (
		<div ref={ref} className="select">
			<div className="select__control" onClick={handleFocus}>
				<div className="select__value__container">
					<input
						placeholder={placeholder}
						className="select__input"
						type="text"
						value={searchValue}
						onChange={handleSearch}
						disabled={disabled}
						ref={inputRef}
					/>
				</div>
				<div className="select__indicators">
					{searchValue && (
						<Clear
							className={
								'select__indicator select__indicator--clear ' +
								(listOpened ? 'select__indicator--active' : '')
							}
							onClick={handleClear}
						>
							Filled
						</Clear>
					)}
					<span className="select__indicator--separator"></span>
					{listOpened ? (
						<KeyboardArrowUp className="select__indicator select__indicator--drop select__indicator--active">
							Filled
						</KeyboardArrowUp>
					) : (
						<KeyboardArrowDown className="select__indicator select__indicator--drop ">
							Filled
						</KeyboardArrowDown>
					)}
				</div>
			</div>
			{listOpened && (
				<div className="select__menu__container">
					<div className="select__menu">
						{dataToDisplay.length > 0 ? (
							dataToDisplay.map((item, index) => (
								<div
									key={item.valueField}
									className="select__menu__item"
									onClick={e => handleItemClick(e, item, index)}
								>
									{item.textField}
								</div>
							))
						) : (
							<div className="select__menu__item select__menu__item--placeholder">
								No Options
							</div>
						)}
					</div>
				</div>
			)}
		</div>
	);
}
