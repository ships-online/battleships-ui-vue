<template>
	<div class="battleships">
		<div
			:style="{ width }"
			class="battleships__fields">

			<PlayerBattlefield
				:size="parent.size"
				:ships="parent.player.ships"
				:rotate-ship="parent.player.rotateShip"
				:move-ship="parent.player.moveShip"
				:cell-size="cellSize"/>

			<OpponentBattlefield
				:size="parent.size"
				:ships="parent.opponent.ships"
				:shoot="parent.opponent.shoot"
				:cell-size="cellSize"/>

		</div>
	</div>
</template>

<script>
	import PlayerBattlefield from './playerbattlefield.vue';
	import OpponentBattlefield from './opponentbattlefield.vue';
	import { getCellSize, toPx } from './utils.js';

	export default {
		components: {
			PlayerBattlefield,
			OpponentBattlefield
		},

		data() {
			return {
				clientWidth: document.body.clientWidth
			};
		},

		computed: {
			parent() {
				return this.$parent;
			},

			cellSize() {
				return getCellSize( this.parent.size, this.clientWidth );
			},

			width() {
				return toPx( ( this.cellSize * this.parent.size ) * 2 + this.cellSize );
			}
		},

		mounted() {
			window.addEventListener( 'resize', () => ( this.clientWidth = document.body.clientWidth ) );
		}
	};
</script>
