<template>
	<div
		:class="[ 'aim', activeClass ]"
		:style="{ top, left, width, height: width }"
		@click="() => shoot( [ x, y ] )"/>
</template>

<script>
	import { toPx } from './utils.js';

	export default {
		props: {
			size: {
				type: Number,
				default: 0
			},
			x: {
				type: Number,
				default: 0
			},
			y: {
				type: Number,
				default: 0
			},
			show: {
				type: Boolean,
				default: false
			},
			shoot: {
				type: Function,
				default: () => {}
			}
		},

		computed: {
			activeClass() {
				return this.show ? 'active' : '';
			},

			left() {
				return toPx( this.x * this.size );
			},

			top() {
				return toPx( this.y * this.size );
			},

			width() {
				return toPx( this.size );
			}
		}
	};
</script>

<style>
	.aim {
		position: absolute;
		background: rgba(100, 100, 100, .2);
		display: none;

		&.active {
			display: block;
		}
	}
</style>
