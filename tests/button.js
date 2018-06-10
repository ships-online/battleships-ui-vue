import Button from '../src/button.vue';
import { shallowMount } from '@vue/test-utils';

describe( 'Button', () => {
	it( 'should render with default props', () => {
		const wrapper = shallowMount( Button );

		expect( wrapper.element.querySelector( '.btn' ).textContent ).to.equal( '' );
		expect( wrapper.element.querySelector( '.btn' ).className ).to.equal( 'btn' );
		expect( wrapper.element.querySelector( '.btn' ).disabled ).to.false;
		expect( wrapper.element.querySelector( '.tooltip' ) ).to.null;
	} );

	it( 'should render with given props', () => {
		const wrapper = shallowMount( Button, {
			propsData: {
				label: 'Foo',
				tooltip: 'Bar',
				className: 'biz',
				disabled: true
			}
		} );

		expect( wrapper.element.querySelector( '.btn' ).textContent ).to.equal( 'Foo' );
		expect( wrapper.element.querySelector( '.btn' ).className ).to.equal( 'btn biz' );
		expect( wrapper.element.querySelector( '.btn' ).disabled ).to.true;
		expect( wrapper.element.querySelector( '.tooltip' ).textContent ).to.equal( 'Bar' );
	} );

	it( 'should call action on execute', () => {
		const spy = sinon.spy();

		const wrapper = shallowMount( Button, {
			propsData: {
				execute: spy
			}
		} );

		sinon.assert.notCalled( spy );

		wrapper.element.querySelector( '.btn' ).click();

		sinon.assert.calledOnce( spy );
	} );
} );
