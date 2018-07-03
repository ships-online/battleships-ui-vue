<template>
	<div
		:style="{ width: dimension + 'px', height: dimension + 'px' }"
		class="field invite">

		<div
			v-if="player.isHost && !opponent.isInGame"
			class="url">
			<p>Share this link to play with your friend</p>
			<div class="input-group">
				<input
					ref="url"
					:value="inviteUrl"
					readonly>
				<v-Button :execute="copy">{{ buttonLabel }}</v-Button>
			</div>
		</div>

		<div v-if="player.isInGame && !player.isReady && opponent.isInGame">
			<p>Arrange your ships and click Ready button.</p>
		</div>

		<p v-if="player.isInGame && !player.isReady && opponent.isInGame && !opponent.isReady">
			Your opponent is arranging ships now.
		</p>

		<p v-if="player.isReady && opponent.isInGame && !opponent.isReady">
			Wait until your opponent finishes arranging ships.
		</p>

		<p v-if="player.isInGame && opponent.isReady">
			Your opponent is ready for the battle.
		</p>

		<p v-if="player.isHost && !opponent.isInGame">
			Number of players that entered the link<br>but not joined the game yet {{ guestsNumber }}.
		</p>

		<div v-if="!player.isHost && !player.isInGame">
			<p>You are invited to the Battleships game.</p>
			<v-Button :execute="join">Join</v-Button>
		</div>

		<p v-if="!player.isHost && !player.isInGame && guestsNumber > 1">
			Players that entered this link along with you {{ guestsNumber - 1 }}.
		</p>

		<p
			v-if="player.isHost && !opponent.isInGame"
			class="random-player"
		>
			Or play with a <v-Button :execute="randomPlayer">Random player</v-Button>
		</p>
	</div>
</template>

<script>
	import Field from './mixins/field.vue';
	import Button from './button.vue';
	import Player from 'battleships-core/src/player.js';

	export default {
		components: {
			'v-Button': Button
		},

		mixins: [ Field ],

		props: {
			player: {
				type: Player,
				default: () => {}
			},
			opponent: {
				type: Player,
				default: () => {}
			},
			inviteUrl: {
				type: String,
				default: ''
			},
			guestsNumber: {
				type: Number,
				default: 0
			},
			randomPlayer: {
				type: Function,
				default: () => {}
			},
			join: {
				type: Function,
				default: () => {}
			},
			ready: {
				type: Function,
				default: () => {}
			}
		},

		data() {
			return {
				buttonLabel: 'Copy'
			};
		},

		methods: {
			copy() {
				this.$refs.url.select();
				document.execCommand( 'copy' );
				this.buttonLabel = 'Copied';

				setTimeout( () => {
					this.buttonLabel = 'Copy';
				}, 1000 );
			}
		}
	};
</script>

<style rel="stylesheet/postcss">
	.invite {
		overflow: auto;

		.random-player {
			margin-top: 3em;
		}
	}
</style>
