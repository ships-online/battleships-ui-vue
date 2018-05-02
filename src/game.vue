<template>
	<Battlefield
		:size="size"
		:ships="player.ships"
		:rotate-ship="rotateShip"
		:move-ship="moveShip" />
</template>

<script>
	import Battlefield from './playerbattlefield.vue';

	export default {
		components: {
			Battlefield
		},

		computed: {
			size() {
				return this.$parent.size;
			},

			player() {
				return this.$parent.player;
			},

			rotateShip() {
				return this.$parent.player.rotateShip;
			},

			moveShip() {
				return this.$parent.player.moveShip;
			}
		}
	};
</script>
