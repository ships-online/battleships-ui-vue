<template>
	<div class="select-theme">
		Themes:
		<ul>
			<li
				v-for="theme of themes"
				:key="theme.name"
				:title="theme.name"
				:class="theme.class"
				@click="() => select( theme )">{{ theme.name }}</li>
		</ul>
	</div>
</template>

<script>
	import { settings } from './utils';

	export default {
		data() {
			return {
				themes: [
					{ name: 'White', class: 'white', bodyClass: '', isActive: true },
					{ name: 'Dark', class: 'dark', bodyClass: 'dark', isActive: false }
				]
			};
		},

		mounted() {
			const currentThemeName = settings.get( 'theme' );
			const currentTheme = this.themes.find( theme => theme.name == currentThemeName );

			if ( currentTheme ) {
				this.select( currentTheme );
			}
		},

		methods: {
			select( theme ) {
				this.themes.forEach( theme => {
					document.body.classList.remove( 'battleships-' + theme.bodyClass );
					theme.isActive = false;
				} );

				theme.isActive = true;
				document.body.classList.add( 'battleships-' + theme.bodyClass );
				settings.set( 'theme', theme.name );
			}
		}
	};
</script>

<style rel="stylesheet/postcss">
	.select-theme {
		display: flex;
		align-items: center;
		margin: 10px 0;

		ul {
			display: flex;
			list-style: none;
			padding: 0;
			margin: 0 0 0 10px;

			li {
				width: 20px;
				height: 20px;
				margin: 0 7px 0 0;
				padding: 0;
				text-indent: -999999px;
				cursor: pointer;

				&.white {
					background: #fff;
					border: solid 2px #ddd;
				}

				&.dark {
					background: #000;
					border: solid 2px #ddd;
				}

			}
		}
	}
</style>
