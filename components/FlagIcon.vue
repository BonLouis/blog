<template>
	<i :class="iconClass">
		<slot />
	</i>
</template>

<script>
export default {
	props: {
		country: {
			required: true,
			type: String
		}
	},
	data: () => ({
		iconClass: {
			'fp': true,
			'fp-square': false,
			'fp-rounded': false,
			'fp-md': false,
			'fp-lg': false,
			'fp-circle': false
		}
	}),
	watch: {
		country (newValue, oldValue) {
			this.$set(this.iconClass, oldValue, false);
			this.$set(this.iconClass, newValue, true);
		}
	},
	created () {
		this.iconClass[this.country] = true;
		for (let attr in this.$attrs) {
			attr = attr.split('-')[1] || attr;
			attr = `fp-${attr}`;
			if (attr in this.iconClass) {
				this.iconClass[attr] = true;
			}
		}
		if (this.iconClass['fp-circle']) {
			this.iconClass['fp-square'] = true;
		}
	}
};
</script>

<style>
.fp.fp-circle {
	border-radius: 50%;
}
</style>
