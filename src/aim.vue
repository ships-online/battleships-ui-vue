<template>
	<div
		:class="[ 'aim', activeClass ]"
		:style="{ top, left, width, height: width }"
		@click="() => shot( [ x, y ] )"/>
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
			shot: {
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
				return toPx( this.size - 1 );
			}
		}
	};
</script>

<style rel="stylesheet/postcss">
	.aim {
		position: absolute;
		background: var( --battleships-aim-background );
		display: none;

		&.active {
			display: block;
		}
	}
</style>
