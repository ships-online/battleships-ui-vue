<template>
	<div
		:class="[ 'marker', typeClass ]"
		:style="{ top, left, width, height: width }"/>
</template>

<script>
	import Field from 'battleships-engine/src/field.js';
	import { toPx } from './utils.js';

	export default {
		props: {
			cellSize: {
				type: Number,
				default: 0
			},
			model: {
				type: Field,
				default: () => {}
			}
		},

		computed: {
			typeClass() {
				if ( this.model.isMissed ) {
					return 'missed';
				} else if ( this.model.isHit ) {
					return 'hit';
				}
			},

			left() {
				return toPx( this.model.position[ 0 ] * this.cellSize );
			},

			top() {
				return toPx( this.model.position[ 1 ] * this.cellSize );
			},

			width() {
				return toPx( this.cellSize - 1 );
			}
		},

		mounted() {
			window.requestAnimationFrame( () => this.$el.classList.add( 'ready' ) );
		}
	};
</script>

<style rel="stylesheet/postcss">
	.marker {
		position: absolute;
		background: rgba(255, 0, 0, .3);
		transform: scale( 0.3 );
		transition: transform .2s;

		&.ready {
			transform: scale( 1 );
		}

		&.missed {
			background: var( --battleships-stamp-missed );
		}

		&.hit {
			background: var( --battleships-stamp-hit );
		}
	}
</style>
