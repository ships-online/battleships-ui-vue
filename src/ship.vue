<template>
	<div :class="[ 'ship', isCollisionClass ]" :style="{ top, left, width: width, height }"></div>
</template>

<script>
	import { toPx } from './utils.js';
	import Ship from 'battleships-engine/src/ship';

	export default {
		props: {
			model: {
				type: Ship
			},
			cellSize: Number
		},

		data() {
			return {
				isDrag: false,
				dragHandlerRef: null
			}
		},

		mounted() {
			let cursorPaddingX, cursorPaddingY;

			this.dragHandlerRef = evt => {
				this.$emit( 'move', {
				    x: evt.clientX - cursorPaddingX,
				    y: evt.clientY - cursorPaddingY
				} );
			};

			this.$el.addEventListener( 'dblclick', () => this.$emit( 'dblclick' ) );
			this.$el.addEventListener( 'mousedown', evt => {
				const shipElBounds = evt.target.getBoundingClientRect();

				cursorPaddingX = evt.clientX - shipElBounds.left;
				cursorPaddingY = evt.clientY - shipElBounds.top;

				evt.preventDefault();
				document.addEventListener( 'mousemove', this.dragHandlerRef );
			} );
			document.addEventListener( 'mouseup', () => document.removeEventListener( 'mousemove', this.dragHandlerRef ) );
		},

		computed: {
			isCollisionClass() {
			    return this.model.isCollision ? 'ship-collision' : '';
			},

			left() {
				return toPx( this.model.position[ 0 ] * this.cellSize );
			},

			top() {
				return toPx( this.model.position[ 1 ] * this.cellSize );
			},

			width() {
				return toPx( ( this.model.isRotated ? 1 : this.model.length ) * this.cellSize );
			},

			height() {
				return toPx( ( this.model.isRotated ? this.model.length : 1 ) * this.cellSize );
			}
		}
	}
</script>
