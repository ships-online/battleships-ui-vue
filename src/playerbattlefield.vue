<template>
	<div class="battleships__field battleships__field_battlefield" :style="{ width: dimension + 'px', height: dimension + 'px' }">
		<Ship v-for="ship of ships"
			  :key="ship.id"
			  :model="ship"
			  :cellSize="cellSize"
			  v-on:dblclick="rotate( ship )"
			  v-on:move="pos => move( pos, ship )"></Ship>
	</div>
</template>

<script>
	import Battlefield from './battlefield.vue';
	import Moveable from './moveable.vue';

	export default {
		mixins: [ Battlefield, Moveable ]
	}
</script>
