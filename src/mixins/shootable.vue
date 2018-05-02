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
				const left = evt.clientX - bounds.left;
				const top = evt.clientY - bounds.top;

				this.aimX = Math.min( Math.floor( left / this.cellSize ), this.size - 1 );
				this.aimY = Math.min( Math.floor( top / this.cellSize ), this.size - 1 );
			} );
		}
	};
</script>
