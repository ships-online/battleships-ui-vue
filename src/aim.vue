<template>
	<div
		:class="[ 'aim', activeClass ]"
		:style="{ top, left, width, height: width }"/>
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
			}
		},

		computed: {
			activeClass() {
				return this.show ? 'aim-active' : '';
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
