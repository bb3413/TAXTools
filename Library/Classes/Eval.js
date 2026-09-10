
function expression(input) {
	//
	// This function evaluates a string that contains a simple mathematical expression. It
	// uses the Shunting-yard algorithm to convert the string into Reverse Polish Notation
	// (RPN) before evaluating it.
	//
	// This function supports:
	//		Dedimal numbers
	//		Operators for addition (+), subtraction (-), multiplication (*), and division (/)
	//		Unary minus operator (-)
	//		Parentheses
	//		Operator precedence for parentheses, unary minus and for doing multiplication and
	//			division before addition and subtraction.
	//
		if (input === null || input === undefined) {
			return 0;
		}
		if (typeof input !== "string") {
			throw new TypeError("input must be a string.");
		}

		// Remove whitespace, then convert string to an array of numbers and
		// operators. For example, convert the string "3 + 4 * (2 - 1)" into
		// the array ["3", "+", "4", "*", "(", "2", "-", "1", ")"]
		const normalized = input.replace(/\s/g, "");
		const tokens = normalized.match(/\d*\.?\d+|[+\-*/()]/g);
		if (!tokens || tokens.length === 0) return 0;

		// Operators object; assign precedence and whether it is left or right associative
		// (e.g., it evaluates --5 from right to left.
		const ops = {
			"+": { prec: 1, assoc: "L", exec: (a, b) => a + b },
			"-": { prec: 1, assoc: "L", exec: (a, b) => a - b },
			"*": { prec: 2, assoc: "L", exec: (a, b) => a * b },
			"/": { prec: 2, assoc: "L", exec: (a, b) => a / b },
			"u-": { prec: 3, assoc: "R", exec: (a) => -a }
		};

		const queue = []; // Output queue
		const stack = []; // Operator stack

		// Convert the tokens into RPN: ["3", "4", "2", "1", "-", "*", "+"]. The
		// opStack is for holding lower precedence tokens.
		tokens.forEach((token, i) => {
			if (!isNaN(token)) {
				queue.push(parseFloat(token));
			} else if (token === "(") {
				stack.push(token);
			} else if (token === ")") {
				while (stack.length && stack[stack.length - 1] !== "(") {
					queue.push(stack.pop());
				}
				stack.pop();
			} else {
				// Unary minus detection
				let type = token;
				if (token === "-" && (i === 0 || (isNaN(tokens[i - 1]) && tokens[i - 1] !== ")"))) {
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

		// Evaluate RPN
		const evalStack = [];
		queue.forEach(t => {
			if (typeof t === "number") {
				evalStack.push(t);
			} else if (t === "u-") {
				evalStack.push(ops["u-"].exec(evalStack.pop()));
			} else {
				const b = evalStack.pop();
				const a = evalStack.pop();
				evalStack.push(ops[t].exec(a, b));
			}
		});

		return evalStack[0];
	}

export const Eval = { expression };
export { expression };

if (typeof window !== "undefined") {
	window.Eval ??= Eval;
}
