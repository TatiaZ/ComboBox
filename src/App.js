import React, { useState } from 'react';
import './App.css';
import ComboBox from './Components/ComboBox';

const demoData = [
	{ valueField: 1, textField: 'Red' },
	{ valueField: 2, textField: 'Blue' },
	{ valueField: 3, textField: 'Green' },
	{ valueField: 4, textField: 'Reddish' },
	{ valueField: 5, textField: 'Blueish' },
	{ valueField: 6, textField: 'Purple' },
	{ valueField: 7, textField: 'Pink' },
	{ valueField: 8, textField: 'White' },
	{ valueField: 9, textField: 'Pinkish' },
	{ valueField: 10, textField: 'Black' }
];

function App() {
	const [comboBoxValue, setComboBoxValue] = useState('');
	const [comboBoxText, setComboBoxText] = useState('');

	return (
		<div className="App">
			<header>
				<h1 className="heading">ComboBox Demo</h1>
			</header>
			<div className="select-container">
				<ComboBox
					data={demoData}
					placeholder={'Select...'}
					onSelectedItemChange={(valueFiled, textField) => {
						setComboBoxValue(valueFiled);
						setComboBoxText(textField);
					}}
					valueField={comboBoxValue}
					textField={comboBoxText}
				/>
			</div>
			<footer>
				<p>&copy; Tatia Zhodurishvili</p>
			</footer>
		</div>
	);
}

export default App;
