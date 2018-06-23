<template>
	<div class="btn-wrapper">
		<button
			:class="[ 'btn', className ]"
			:disabled="disabled"
			:type="type"
			@click="execute"><slot /></button>

		<span
			v-if="tooltip"
			:class="[ 'tooltip', tooltipPosition ]"
			v-html="tooltip"/>
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
			className: {
				type: String,
				default: ''
			},
			type: {
				type: String,
				default: 'button'
			},
			tooltip: {
				type: String,
				default: ''
			},
			tooltipPosition: {
				type: String,
				default: 'center',
				validator: value => [ 'center', 'toLeft', 'toRight' ].includes( value )
			}
		}
	};
</script>

<style rel="stylesheet/postcss">
	.btn-wrapper {
		position: relative;
		display: inline-block;

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
					transition-delay: .2s;
					transform: translateY(5px);

					&.center {
						transform: translate(-50%,5px);
					}
				}

				&:not([disabled]) {
					color: var( --battleships-button-hover-color );
					background: var( --battleships-button-hover-background-color );
				}
			}
		}

		.tooltip {
			position: absolute;
			z-index: 10;
			display: block;
			padding: 3px 8px 4px;
			background: var( --battleships-tooltip-background-color );
			color: var( --battleships-tooltip-color );
			font-size: 13px;
			transform: translateY(3px);
			border-radius: 2px;
			white-space: nowrap;

			opacity: 0;
			visibility: hidden;
			transition: .3s;
			transition-property: opacity, visibility, transform;

			&:before {
				position: absolute;
				content: '';
				display: block;
				width: 0;
				height: 0;
				top: -10px;
				border: solid 5px;
				border-color: transparent transparent var( --battleships-tooltip-background-color ) transparent;
			}

			&.toLeft {
				left: 0;

				&:before {
					left: 15px;
				}
			}

			&.toRight {
				right: 0;

				&:before {
					right: 15px;
				}
			}

			&.center {
				left: 50%;
				transform: translateX(-50%);

				&:before {
					left: 50%;
					transform: translateX(-50%);
				}
			}
		}
	}
</style>
