document.addEventListener("DOMContentLoaded", () => {
	document.addEventListener("mouseover", (e) => {
		// Check the element or its parent for the trigger
		const trigger = e.target.closest(".trigger");
		if (!trigger) return;
		// console.log("1. Trigger found:", trigger);

		// Find the tooltipID.
		let tipId = trigger.getAttribute("tooltipID");
		if (!tipId) {
        	console.warn("Element has class trigger but missing tooltipID attribute.");
            return;
        }
		// console.log("2. tooltipID attribute value:", tipId);

		// Ensure selector starts with '#' if an raw ID was provided
		if (!tipId.startsWith("#") && !tipId.startsWith(".")) {
			tipId = `#${tipId}`;
		}

		// Find the tooltip.
		const tip = document.querySelector(tipId);
		if (!tip) {
            console.warn(`Could not find any element in DOM matching selector: "${tipId}"`);
            return;
        }
		if (!tip) return;
		// console.log("3. Tooltip element found in DOM:", tip);

		// Position calculations
		const triggerRect = trigger.getBoundingClientRect();
		const screenW = window.innerWidth;
		const scrollY = window.scrollY;

		// Briefly display to measure rendered size
		tip.style.display = "block";
		const tipRect = tip.getBoundingClientRect();

		// Vertical positioning (flip below if hitting top boundary)
		let ttTop = (triggerRect.top + scrollY) - tipRect.height - 25;
		if (ttTop < scrollY + 20) {
			ttTop = (triggerRect.bottom + scrollY) + 25;
		}

		// Horizontal positioning (shift left if hitting right viewport edge)
		let ttLeft = triggerRect.left;
		const tipRightEdge = ttLeft + tipRect.width;

		if (tipRightEdge > screenW) {
			const overflow = tipRightEdge - screenW;
			ttLeft = ttLeft - overflow - 20; // 20px padding from screen edge
		}

		// Apply styles & activate
		tip.style.top = `${ttTop}px`;
		tip.style.left = `${ttLeft}px`;
		tip.classList.add("is-active");
	});

	document.addEventListener("mouseout", (e) => {
		const trigger = e.target.closest(".trigger");
		if (!trigger) return;

		// Ignore mouseout if pointer moves between child elements inside the trigger
		if (e.relatedTarget && trigger.contains(e.relatedTarget)) return;

		let tipId = trigger.getAttribute("tooltipID");
		if (!tipId) return;

		if (!tipId.startsWith("#") && !tipId.startsWith(".")) {
			tipId = `#${tipId}`;
		}

		const tip = document.querySelector(tipId);
		if (tip) {
			tip.classList.remove("is-active");
		}
	});
});