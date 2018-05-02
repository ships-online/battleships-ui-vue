<script>
	export default {
		methods: {
			move( pos, ship ) {
				const bounds = this.$el.getBoundingClientRect();
				const { dimension, cellSize } = this;

				let x = pos.x - bounds.left;
				let y = pos.y - bounds.top;

				// Keep in bounds.
				x = Math.min( Math.max( x, 0 ), dimension - ( ship.isRotated ? 1 : ship.length ) * cellSize );
				y = Math.min( Math.max( y, 0 ), dimension - ( ship.isRotated ? ship.length : 1 ) * cellSize );

				// Snap to grid.
				x = Math.round( x / cellSize );
				y = Math.round( y / cellSize );

				if ( ship.position[ 0 ] !== x || ship.position[ 1 ] !== y ) {
					this.moveShip( ship, [ x, y ] );
				}
			},

			rotate( ship ) {
				this.rotateShip( ship );
			}
		}
	};
</script>
