import { getCellSize, toPx, collectionToArray } from '../src/utils';
import Collection from '@ckeditor/ckeditor5-utils/src/collection';

describe( 'getCellSize()', () => {
	it( 'should return optimal cell size', () => {
		expect( getCellSize( 10, 110 ) ).to.equal( 5 );
	} );

	it( 'should return max cell size', () => {
		expect( getCellSize( 10, 1100 ) ).to.equal( 46 );
	} );
} );

describe( 'toPx()', () => {
	it( 'should return value with px', () => {
		expect( toPx( 10 ) ).to.equal( '10px' );
	} );
} );

describe( 'collectionToArray()', () => {
	let collection;

	beforeEach( () => {
		collection = new Collection();

		collection.add( { 'foo': 'bar' } );
		collection.add( { 'bar': 'biz' } );
	} );

	it( 'should return array from given collection', () => {
		const arr = collectionToArray( collection );

		expect( arr ).to.be.an( 'array' );
		expect( arr ).to.length( 2 );
		expect( arr[ 0 ] ).to.have.property( 'foo', 'bar' );
		expect( arr[ 1 ] ).to.have.property( 'bar', 'biz' );
	} );

	it( 'should update array when new item is added to the collection', () => {
		const arr = collectionToArray( collection );

		expect( arr ).to.length( 2 );

		collection.add( { 'a': 'b' } );

		expect( arr ).to.length( 3 );
		expect( arr[ 2 ] ).to.have.property( 'a', 'b' );
	} );

	it( 'should update array when item is removed from the collection', () => {
		const arr = collectionToArray( collection );

		expect( arr ).to.length( 2 );

		collection.remove( 0 );

		expect( arr ).to.length( 1 );
	} );
} );
