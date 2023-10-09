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
	 var dep = new Dep();
	Object.keys(obj).forEach((key) => {
		let internalValue = obj[key];
		Object.defineProperty(obj, key, {
			get() {
				// console.log(`getting key "${key}": ${internalValue}`)
				if (activeUpdate) {
					dep.depend();
				}
				return internalValue;
			},
			set(newVal) {
				internalValue = newVal;
				dep.notify();
			},
		});
	});
}
let state = {
	count: 0,
};
observer(state);
autorun(() => {
	console.log(state.count);
});
state.count = state.count + 5;



