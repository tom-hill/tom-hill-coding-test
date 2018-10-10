import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import LineupView from '../LineupView';

describe('<LineupView />', () => {
  const props = {
    data: 'data',
  };

  it('renders the data passed in to it', () => {
    const wrapper = shallow(<LineupView {...props} />);
    expect(wrapper.text()).to.equal('"data"');
  });
});
