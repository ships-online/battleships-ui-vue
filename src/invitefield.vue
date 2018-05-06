<template>
	<div
		:style="{ width: dimension + 'px', height: dimension + 'px' }"
		class="battleships__field">
		<p>{{ inviteUrl }}</p>
		<p>{{ interestedPlayersNumber }}</p>
	</div>
</template>

<script>
	import Field from './mixins/field.vue';

	export default {
		mixins: [ Field ],

		props: {
			inviteUrl: {
				type: String,
				default: ''
			},
			interestedPlayersNumber: {
				type: Number,
				default: 0
			},
			isHost: {
				type: Boolean,
				default: true
			}
		}
	};
</script>
