import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import LoadingView from '../LoadingView';

describe('<LoadingView />', () => {
  it('renders loading text', () => {
    const wrapper = shallow(<LoadingView />);
    expect(wrapper.text()).to.equal('LOADING...');
  });
});
