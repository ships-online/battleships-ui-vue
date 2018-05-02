<template>
	<div>
		<PlayerBattlefield
			:size="size"
			:ships="player.ships"
			:rotate-ship="rotateShip"
			:move-ship="moveShip" />

		<OpponentBattlefield
			:size="size"
			:ships="opponent.ships"
			:shoot="shoot" />
	</div>
</template>

<script>
	import PlayerBattlefield from './playerbattlefield.vue';
	import OpponentBattlefield from './opponentbattlefield.vue';

	export default {
		components: {
			PlayerBattlefield,
			OpponentBattlefield
		},

		computed: {
			size() {
				return this.$parent.size;
			},

			player() {
				return this.$parent.player;
			},

			opponent() {
				return this.$parent.opponent;
			},

			rotateShip() {
				return this.player.rotateShip;
			},

			moveShip() {
				return this.player.moveShip;
			},

			shoot() {
				return this.opponent.shoot;
			}
		}
	};
</script>
