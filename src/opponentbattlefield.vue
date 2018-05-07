<template>
	<div
		:style="{ width: dimension + 'px', height: dimension + 'px' }"
		:class="[ 'field', 'battlefield', inactiveClass ]">
		<Ship
			v-for="ship of ships"
			:key="ship.id"
			:model="ship"
			:cell-size="cellSize"/>
		<Stamp
			v-for="field of fields"
			v-if="field.isMissed || field.isHit"
			:key="field.id"
			:model="field"
			:cell-size="cellSize"/>
		<Aim
			:size="cellSize"
			:x="aimX"
			:y="aimY"
			:show="isActive && isAimVisible"
			:shoot="shoot"/>
	</div>
</template>

<script>
	import Battlefield from './mixins/battlefield.vue';
	import Shootable from './mixins/shootable.vue';
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
