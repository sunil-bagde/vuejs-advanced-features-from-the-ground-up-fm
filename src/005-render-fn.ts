
/*
Virtual dom

a lightweight JS data format
to resprent what the actaul DOM
should look kike a gievn in time

benfits
decouple logic the actaul dom
enables rendering capabities in non browser environments
e.g server side native mobile
*/

`
<div id="app">
	<example :tags="[h1,h2,h3]"></example>
	
</div>

`;

Vue.component("example", {
	props: ["tags"],
	render() {
		const children = this.tags.map((t, i) => h(t, i));
		return h("div", children);
	},
});
