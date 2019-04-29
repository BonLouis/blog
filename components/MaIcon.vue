<template>
	<i :class="iconClass">
		<slot />
	</i>
</template>

<script>
export default {
	data: () => ({
		iconClass: {
			'material-icons': true,
			'md-dark': false,
			'md-light': false,
			'md-18': false,
			'md-24': false,
			'md-36': false,
			'md-48': false,
			'inactive': false
		}
	}),
	created () {
		for (const attr in this.$attrs) {
			if (attr in this.iconClass) {
				this.iconClass[attr] = true;
			} else {
				let size;
				if (size = attr.match(/\d+/)) {
					if ('md-' + size in this.iconClass) {
						this.iconClass['md-' + size] = true;
					}
				}
			}
		}
	}
};
</script>

<style>

</style>
