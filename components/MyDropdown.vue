<template>
	<li class="my-dropdown__root"
		@click="isOpen = !isOpen"
	>
		<div>
			<slot>Default content</slot>
			<ma-icon :class="['my-dropdown__arrow', {rotate: isOpen}]">
				keyboard_arrow_down
			</ma-icon>
		</div>
		<transition name="my-dropdown__transition">
			<ul v-show="isOpen"
				class="my-dropdown__items"
			>
				<li v-for="(item, i) in items"
					:key="i"
				>
					<slot name="content"
						v-bind="item"
					>
						<nuxt-link :to="item.to">
							{{ item.name }}
						</nuxt-link>
					</slot>
				</li>
			</ul>
		</transition>
	</li>
</template>

<script>
import MaIcon from '~/components/MaIcon';
export default {
	components: {
		MaIcon
	},
	props: {
		items: {
			required: true,
			type: Array
		}
	},
	data: () => ({
		isOpen: false
	})

};
</script>

<style lang="scss">
$color-dropdown: #ffffff;
$color-font: #000000;
$color-border: #000000;

$space-before-dropdown: .5em;
.my-dropdown__root {
	user-select: none;
	&:hover { cursor: pointer; }
	& > div {
		display: flex;
		align-items: center;
	}
	& .my-dropdown__items {
		color: $color-font;
		position: absolute;
		transform: translateX(-50%) translateY(.5em);
		background-color: $color-dropdown;
		border: 1px solid $color-border;
		& > li {
			white-space: nowrap;
			transition: background-color .25s;
			padding: 0.3em 1em;
			&:nth-last-child(n+2) { border-bottom: 1px solid $color-border; }
			&:hover { background-color: darken( $color-dropdown, 5% ) }
		}
	}
	& .my-dropdown__arrow { transition: transform .1s; }
	& .my-dropdown__arrow.rotate { transform: rotate(180deg); }
}
.rtl .my-dropdown__items {
	transform: translateX(50%) translateY($space-before-dropdown);
}
// Transition
$duration: .25s;
.my-dropdown__transition-enter {
	opacity: 0;
	transform: translateX(10%) translateY($space-before-dropdown) !important;
}
.my-dropdown__transition-enter-to {
	transition: all $duration ease;
	opacity: 1;
	transform: translateX(-50%) translateY($space-before-dropdown) !important;
}
.my-dropdown__transition-leave-to {
	transition: all $duration ease;
	transform: translateX(-10%) translateY($space-before-dropdown) !important;
	opacity: 0;

}
// rtl transition
.rtl .my-dropdown__transition-enter {
	opacity: 0;
	transform: translateX(-10%) translateY($space-before-dropdown) !important;
}
.rtl .my-dropdown__transition-enter-to {
	transition: all $duration ease;
	opacity: 1;
	transform: translateX(50%) translateY($space-before-dropdown) !important;
}
</style>
