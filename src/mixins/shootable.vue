<script>
	export default {
		props: {
			shoot: {
				type: Function,
				default: () => {}
			},
			isShootEnabled: {
				type: Boolean,
				default: false
			}
		},

		data() {
			return {
				isWaitingForResponse: false,
				isAimVisible: false,
				aimX: 0,
				aimY: 0
			};
		},

		mounted() {
			let bounds;

			this.$el.addEventListener( 'mouseenter', () => {
				bounds = this.$el.getBoundingClientRect();
			} );

			this.$el.addEventListener( 'mouseleave', () => {
				this.isAimVisible = false;
			} );

			this.$el.addEventListener( 'mousemove', evt => {
				if ( this.isWaitingForResponse ) {
					this.isAimVisible = false;

					return;
				}

				const posX = Math.floor( ( evt.clientX - bounds.left ) / this.cellSize );
				const posY = Math.floor( ( evt.clientY - bounds.top ) / this.cellSize );
				const x = Math.min( posX, this.size - 1 );
				const y = Math.min( posY, this.size - 1 );

				if ( this.fields.some( field => field.id === `${ x }x${ y }` ) ) {
					this.isAimVisible = false;
				} else {
					this.isAimVisible = true;
					this.aimX = x;
					this.aimY = y;
				}
			} );
		},

		methods: {
			handleShoot( position ) {
				if ( this.isWaitingForResponse ) {
					return;
				}

				this.isAimVisible = false;
				this.isWaitingForResponse = true;
				this.shoot( position ).then( () => ( this.isWaitingForResponse = false ) );
			}
		}
	};
</script>
