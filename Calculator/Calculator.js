
import { Eval } from "../Library/Modules/Eval.js";

let currentInput = "";
const display = document.getElementById("display");

function appendToDisplay(value) {
	// This function processes input from the calculator buttons.
	const start = display.selectionStart;
	const end = display.selectionEnd;

	// A "Fresh Start" is when input is empty or just a calculated "0"
	const isFreshStart = (currentInput === "" || currentInput === "0");

	// 1. If fresh start and user hits a DIGIT or MINUS: Replace 0
	if (isFreshStart && (/^[0-9]/.test(value) || value === "-")) {
		currentInput = value;
		updateDisplay(value.length);
		return;
	}

	// 2. If fresh start and user hits DECIMAL: result "0."
	if (isFreshStart && value === ".") {
		currentInput = "0.";
		updateDisplay(2);
		return;
	}

	// 3. If fresh start and user hits +, *, or /: result "0+"
	if (isFreshStart && /^[+*/]/.test(value)) {
		currentInput = "0" + value;
		updateDisplay(2);
		return;
	}

	// 4. Standard insertion at cursor
	currentInput = currentInput.slice(0, start) + value + currentInput.slice(end);
	updateDisplay(start + value.length);
}

function calculateResult() {
	if (!currentInput) return;
	try {
		const cleanInput = currentInput.replace(/,/g, "");
		let result = Eval.expression(cleanInput);	// Use the TAXTools version of solve().

		// Overflow check: cap at 12 digits or Handle Infinity
		if (!isFinite(result) || Math.abs(result) > 999999999999) {
			display.value = "Overflow Error";
			currentInput = "";
			return;
		}

		// Precision handling: convert to 12 sig figs then back to string
		currentInput = Number(parseFloat(result.toPrecision(12)).toString()).toString();
		updateDisplay(currentInput.length);
	} catch (error) {
		display.value = "Error";
		currentInput = "";
	}
}

function clearDisplay() {
	currentInput = "";
	updateDisplay();
}

function deleteAtCursor() {
	const start = display.selectionStart;
	const end = display.selectionEnd;

	if (start !== end) {
		currentInput = currentInput.slice(0, start) + currentInput.slice(end);
		updateDisplay(start);
	} else if (start > 0) {
		const isLastChar = (currentInput.length === 1);
		currentInput = currentInput.slice(0, start - 1) + currentInput.slice(start);
		updateDisplay(isLastChar ? 1 : start - 1);
	}
}

function solve(input) {
	// --- Shunting-yard Engine ---
	const tokens = input.match(/\d*\.?\d+|[+\-*/()]/g);
	if (!tokens) return 0;

	const ops = {
		"+": { prec: 1, assoc: "L", exec: (a, b) => a + b },
		"-": { prec: 1, assoc: "L", exec: (a, b) => a - b },
		"*": { prec: 2, assoc: "L", exec: (a, b) => a * b },
		"/": { prec: 2, assoc: "L", exec: (a, b) => a / b },
		"u-": { prec: 3, assoc: "R", exec: (a) => -a }
	};

	const queue = [];
	const stack = [];

	tokens.forEach((token, i) => {
		if (!isNaN(token)) {
			queue.push(parseFloat(token));
		} else if (token === "(") {
			stack.push(token);
		} else if (token === ")") {
			while (stack.length && stack[stack.length - 1] !== "(") queue.push(stack.pop());
			stack.pop();
		} else {
			let type = token;
			if (token === "-" &&
				(i === 0 || (isNaN(tokens[i - 1]) && tokens[i - 1] !== ")"))) {
				type = "u-";
			}
			while (stack.length && stack[stack.length - 1] !== "(") {
				const top = stack[stack.length - 1];
				if (ops[type].prec < ops[top].prec ||
					(ops[type].prec === ops[top].prec && ops[type].assoc === "L")) {
					queue.push(stack.pop());
				} else break;
			}
			stack.push(type);
		}
	});

	while (stack.length) queue.push(stack.pop());

	const evalStack = [];
	queue.forEach(t => {
		if (typeof t === "number") evalStack.push(t);
		else if (t === "u-") evalStack.push(ops["u-"].exec(evalStack.pop()));
		else {
			const b = evalStack.pop();
			const a = evalStack.pop();
			evalStack.push(ops[t].exec(a, b));
		}
	});
	return evalStack[0] || 0;
}

function updateDisplay(newCursorPos = null) {
	// --- UI & Cursor Logic ---
	display.value = currentInput || "0";

	let position;
	if (newCursorPos !== null) {
		position = newCursorPos;
	} else {
		position = display.value.length;
	}

	// Force cursor to the right of the placeholder "0"
	if (display.value === "0" && position === 0) {
		position = 1;
	}

	setTimeout(() => {
		display.focus();
		display.setSelectionRange(position, position);
	}, 0);
}

document.addEventListener('DOMContentLoaded', () => {
	document.querySelector('.buttons').addEventListener('click', (event) => {
		const button = event.target;
		if (!button.matches('button')) return;

		const action = button.dataset.action;
		const val = button.dataset.val;

		if (action === 'clear') clearDisplay();
		else if (action === 'delete') deleteAtCursor();
		else if (action === 'calculate') calculateResult();
		else if (val) appendToDisplay(val);
	});

	display.addEventListener("input", (e) => {
		// This function processes input from the keyboard.
		let val = e.target.value;

		// Handle the leading zero logic for keyboard typing
		if (/^0[0-9]/.test(val)) {
			val = val.substring(1);
		} else if (val === "0-") {
			val = "-";
		}

		currentInput = val.replace(/[^0-9+\-*/().,]/g, "");
		updateDisplay(e.target.selectionStart);
	});

	document.addEventListener("keydown", (e) => {
		// --- Keyboard Hooks ---
		if (e.key === "Backspace") {
			e.preventDefault();
			deleteAtCursor();
		}
		if (e.key === "Enter" || e.key === "=") {
			e.preventDefault();
			calculateResult();
		}
		if (e.key === "Escape") {
			e.preventDefault();
			clearDisplay();
		}
	});
});

window.onload = () => {
	// --- Initialization ---
	currentInput = "";
	updateDisplay(1);
};
