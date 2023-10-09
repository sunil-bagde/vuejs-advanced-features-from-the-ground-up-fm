class Dep {
	constructor() {
		this.subscriber = new Set();
	}
	depend() {
		if (activeUpdate) {
			this.subscriber.add(activeUpdate);
		}
	}
	notify() {
		this.subscriber.forEach((sub) => {
			sub();
		});
	}
}

let activeUpdate;

function autorun(update) {
	function wrapperUpdate() {
		activeUpdate = wrapperUpdate;
		update(); // wrapperUpdate, closure
		activeUpdate = null;
	}
	wrapperUpdate();
}
function observer(obj) {
	Object.keys(obj).forEach(() => {
		let internalValue = obj[key];
		Object.defineProperty(obj, key, {
			get() {
				// console.log(`getting key "${key}": ${internalValue}`)
				if (activeUpdate) {
					dep.depend();
				}
				return internalValue;
			},
			set() {
				internalValue = newVal;
				dep.notify();
			},
		});
	});
}
export { Dep, autorun };
