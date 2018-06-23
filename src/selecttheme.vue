<template>
	<div
		v-if="!virtual"
		class="select-theme">
		Themes:
		<ul>
			<li
				v-for="theme of themes"
				:key="theme.name"
				:title="theme.name"
				:class="theme.class"
				@click="evt => handleClick( evt, theme )"
			>
				<a :href="'#' + theme.class"/>
			</li>
		</ul>
	</div>
</template>

<script>
	import { settings } from './utils';

	export default {
		props: {
			virtual: {
				type: Boolean,
				default: false
			}
		},

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
			},

			handleClick( evt, theme ) {
				evt.preventDefault();
				this.select( theme );
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
				margin: 0 7px 0 0;
				padding: 0;

				a {
					display: block;
					width: 20px;
					height: 20px;
				}

				&.white {
					a {
						background: #fff;
						border: solid 2px #ddd;
					}
				}

				&.dark {
					a {
						background: #000;
						border: solid 2px #ddd;
					}
				}
			}
		}
	}
</style>
