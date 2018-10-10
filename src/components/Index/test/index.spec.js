import React from 'react';
import sinon from 'sinon';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { Index } from '../index';
import LoadingView from '../../LoadingView/LoadingView';
import LineupView from '../../LineupView/LineupView';

describe('<Index />', () => {
  const props = {
    initialiseApplication: sinon.spy(),
  };

  it('always renders', () => {
    const wrapper = shallow(<Index {...props} />);
    expect(wrapper.children().length).to.be.above(0);
  });

  it('calls initialiseApplication on first mount', () => {
    shallow(<Index {...props} />);
    expect(props.initialiseApplication.called).to.equal(true);
  });

  it('renders <LoadingView /> by default', () => {
    const wrapper = shallow(<Index {...props} />);
    expect(wrapper.find(LoadingView)).to.have.lengthOf(1);
  });

  it('renders <LineupView /> when loading prop is false', () => {
    const wrapper = shallow(<Index {...props} loading={false} lineupData={{ team: 'data' }} />);
    expect(wrapper.find(LineupView)).to.have.lengthOf(1);
  });
});
