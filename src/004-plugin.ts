const Vue = {};

const RulePlugin = {
	install(Vue) {
		Vue.maxin({
			created() {
				if (this.$options.rules) {
					Object.keys(this.$options.rules).forEach((key) => {
						const rule = this.$options.rules[key];

						this.$watch(key, (newValue) => {
							const result = rule.validate(newValue);
							if (!result) {
								console.log(rule.message);
							}
						});
					});
				}
			},
		});
	},
};

Vue.use(RulePlugin);
const vm = new vue({
	data: { foo: 10 },
	rules: {
		foo: {
			validate: (value) => value > 1,
			message: "foo must be greater than one",
		},
	},
});

console.log("vm", vm);