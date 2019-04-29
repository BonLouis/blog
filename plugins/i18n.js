
// this.$i18n.locales.filter(i => i.code !== this.$i18n.locale)
export default ({ app }) => {
	/**
	 *	Put '~/translations/locales.js' in store.state
	 */
	if (!app.store.state.locales.length) {
		app.store.commit(
			'setLocales',
			app.i18n.locales

		);
	}
	/**
	 * 	Check if current language is rtl, and tell the store
	 */
	if (app.i18n.locales.find(x => x.code === app.i18n.locale).dir === 'rtl') {
		app.store.commit('setRTL', true);
	} else {
		app.store.commit('setRTL', false);
	}
	/**
	 * 	Check if new language is rtl, and tell the store
	 */
	app.i18n.onLanguageSwitched = (oldLocale, newLocale) => {
		if (app.i18n.locales.find(x => x.code === newLocale).dir === 'rtl') {
			app.store.commit('setRTL', true);
		} else {
			app.store.commit('setRTL', false);
		}
	};
};
