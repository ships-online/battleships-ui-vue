<template>
	<div class="btn-wrapper">
		<button
			:class="[ 'btn', className ]"
			:disabled="disabled"
			@click="execute"
		>{{ label }}</button>

		<span
			v-if="tooltip"
			class="tooltip"
		>{{ tooltip }}</span>
	</div>
</template>

<script>
	export default {
		props: {
			label: {
				type: String,
				default: ''
			},
			execute: {
				type: Function,
				default: () => {}
			},
			disabled: {
				type: Boolean,
				default: false
			},
			tooltip: {
				type: String,
				default: ''
			},
			className: {
				type: String,
				default: ''
			}
		}
	};
</script>

<style>
	.btn-wrapper {
		position: relative;

		.btn {
			font-size: 1em;
			padding: 5px 10px 6px;
			border: solid 1px var( --battleships-button-border-color );
			color: var( --battleships-button-color );
			background: var( --battleships-button-background-color );
			border-radius: var( --battleships-border-radius );
			transition: .08s;
			transition-property: color, background;

			&[disabled] {
				opacity: 0.5;
			}

			&:hover {
				& + .tooltip {
					opacity: 1;
					visibility: visible;
				}

				&:not([disabled]) {
					color: var( --battleships-button-hover-color );
					background: var( --battleships-button-hover-background-color );
				}
			}
		}

		.tooltip {
			position: absolute;
			display: block;
			padding: 3px 8px 4px;
			left: 50%;
			background: #000;
			color: #fff;
			font-size: 13px;
			transform: translate(-50%, 5px);
			border-radius: 2px;

			opacity: 0;
			visibility: hidden;
			transition: .3s;
			transition-property: opacity, visibility;

			&:before {
				position: absolute;
				content: '';
				display: block;
				width: 0;
				height: 0;
				top: -10px;
				left: 50%;
				transform: translateX(-50%);
				border: solid 5px;
				border-color: transparent transparent #000 transparent;
			}
		}
	}
</style>
