<template>
	<div
		:style="{ width: dimension + 'px', height: dimension + 'px' }"
		class="battleships__field battleships__field_battlefield">
		<Ship
			v-for="ship of ships"
			:key="ship.id"
			:model="ship"
			:cell-size="cellSize"
			@:dblclick="rotate( ship )"
			@:move="pos => move( pos, ship )"/>
	</div>
</template>

<script>
	import Battlefield from './battlefield.vue';
	import Moveable from './moveable.vue';

	export default {
		mixins: [ Battlefield, Moveable ]
	};
</script>
