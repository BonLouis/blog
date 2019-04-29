<template>
	<nav>
		<ul>
			<li v-for="(item, i) of items"
				:key="i"
			>
				<nuxt-link :to="item.path">
					{{ item.title }}
				</nuxt-link>
			</li>
			<lang-switcher />
		</ul>
	</nav>
</template>

<script>
import LangSwitcher from '@/components/LangSwitcher';
export default {
	components: {
		LangSwitcher
	},
	computed: {
		items () {
			return [
				{ title: 'Home', path: this.localePath('index') },
				{ title: 'About', path: this.localePath('about') }
			];
		}
	}
};
</script>

<style lang="scss" scoped>
$color-nav: #2797ab;
$color-font: #ffffff;
nav {
	background-color: $color-nav;
	color: $color-font;
	padding: 1em;
}
nav ul {
	display: flex;
	justify-content: space-around;
	align-items: center;
}
</style>
