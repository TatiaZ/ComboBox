import React, { useRef, useEffect, useState } from 'react';

export default function useOutsideClick(initialState, callBack) {
	const [isClickedOutside, setIsClickedOutside] = useState(initialState);
	const ref = useRef(null);
	const handleClickOutside = event => {
		if (ref.current && !ref.current.contains(event.target)) {
			setIsClickedOutside(false);
			callBack();
		}
	};

	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	});
	return { ref, isClickedOutside, setIsClickedOutside };
}
