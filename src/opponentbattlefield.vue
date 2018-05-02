<template>
	<div
		:style="{ width: dimension + 'px', height: dimension + 'px' }"
		class="battleships__field battleships__field_battlefield">
		<Ship
			v-for="ship of ships"
			:key="ship.id"
			:model="ship"
			:cell-size="cellSize"/>
		<Aim
			:size="cellSize"
			:x="aimX"
			:y="aimY"
			:show="isAimVisible"
			:shoot="shoot"/>
	</div>
</template>

<script>
	import Battlefield from './battlefield.vue';
	import Shootable from './shootable.vue';
	import Aim from './aim.vue';

	export default {
		components: {
			Aim
		},

		mixins: [ Battlefield, Shootable ],

		props: {
			shoot: {
				type: Function,
				default: () => {}
			}
		}
	};
</script>
