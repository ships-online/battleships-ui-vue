<template>
	<div
		:style="{ width: dimension + 'px', height: dimension + 'px' }"
		:class="[ 'field', 'battlefield', inactiveClass ]">
		<MarkerField
			v-for="field of fields"
			v-if="field.isMissed || field.isHit"
			:key="field.id"
			:model="field"
			:cell-size="cellSize"/>
		<Ship
			v-for="ship of ships"
			:key="ship.id"
			:model="ship"
			:cell-size="cellSize"
			@dblclick="rotate( ship )"
			@move="pos => move( pos, ship )"/>
	</div>
</template>

<script>
	import Battlefield from './mixins/battlefield.vue';
	import Moveable from './mixins/moveable.vue';

	export default {
		mixins: [ Battlefield, Moveable ]
	};
</script>
