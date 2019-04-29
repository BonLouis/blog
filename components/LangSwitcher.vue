<template>
	<my-dropdown :items="availableLocales">
		<flag-icon :country="locale.flag || locale.code"
			circle
			md
		/>
		<!-- {{ locale.name }} -->
		<template v-slot:content="item">
			<nuxt-link :to="switchLocalePath(item.code)">
				<flag-icon :country="item.flag || item.code"
					md
					circle
				/>
				{{ item.name }}
			</nuxt-link>
		</template>
	</my-dropdown>
</template>

<script>
import { mapState } from 'vuex';
import FlagIcon from '~/components/FlagIcon';
import MyDropdown from '~/components/MyDropdown';
export default {
	components: {
		FlagIcon,
		MyDropdown
	},
	data: () => ({
		isOpen: false,
		items: []
	}),
	computed: {
		...mapState({
			locales: 'locales',
			locale: state => state.locales.find(x => x.code === state.i18n.locale)
		}),
		availableLocales () {
			return this.locales
				.filter(x => x.name !== this.$store.state.i18n.locale)
				.map(x => ({
					...x,
					to: this.switchLocalePath(x.code)
				}));
		}
	}

};
</script>
