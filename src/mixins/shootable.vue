<script>
	export default {
		data() {
			return {
				isAimVisible: false,
				aimX: 0,
				aimY: 0
			};
		},

		mounted() {
			let bounds;

			this.$el.addEventListener( 'mouseenter', () => {
				this.isAimVisible = true;
				bounds = this.$el.getBoundingClientRect();
			} );

			this.$el.addEventListener( 'mouseleave', () => {
				this.isAimVisible = false;
			} );

			this.$el.addEventListener( 'mousemove', evt => {
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
		}
	};
</script>
