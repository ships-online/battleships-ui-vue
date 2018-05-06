<template>
	<div
		:class="[ 'marker', stateClass ]"
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
			stateClass() {
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
				return toPx( this.cellSize );
			}
		}
	};
</script>
