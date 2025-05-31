import { useState } from 'react';

export const useChangeText = forgotPawsswordText => {
	const [state, setState] = useState(forgotPawsswordText);

	function changeText() {
		setState(() => (forgotPawsswordText = 'Write to me at sunnatbackidjanov@gmail.com'));
	}

	return { state, changeText };
};
