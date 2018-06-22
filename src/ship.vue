<template>
	<div
		:class="[ 'ship', isCollisionClass ]"
		:style="{ top, left, width, height }"/>
</template>

<script>
	import { toPx } from './utils.js';
	import Ship from 'battleships-engine/src/ship';

	export default {
		props: {
			model: {
				type: Ship,
				default: {}
			},
			cellSize: {
				type: Number,
				default: 0
			}
		},

		data() {
			return {
				isDrag: false,
				dragHandlerRef: null
			};
		},

		computed: {
			isCollisionClass() {
				return this.model.isCollision ? 'collision' : '';
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
		}
	};
</script>

<style>
	.ship {
		position: absolute;
		margin: -1px 0 0 -1px;
		border: solid 2px var( --battleships-ship-border-color );
		background: var( --battleships-ship-background-color );

		&.collision {
			border-color: var( --battleships-ship-collision-border-color );
			background: var( --battleships-ship-collision-background-color );
		}
	}
</style>
