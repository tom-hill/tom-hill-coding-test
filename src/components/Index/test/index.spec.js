import React from 'react';
import sinon from 'sinon';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { IndexComponent as Index } from '../index';
import LoadingView from '../../LoadingView/LoadingView';
import LineupView from '../../LineupView/LineupView';

describe('<Index />', () => {
  const bind = sinon.spy();
  const subscribe = sinon.stub().callsFake(() => ({
    bind,
  }));
  const props = {
    loading: true,
    lineupData: {},
    initialiseApplication: sinon.stub().resolves({
      subscribe,
    }),
    newLineupsReceived: sinon.spy(),
  };

  describe('First Mount', () => {
    const wrapper = shallow(<Index {...props} />);
    it('calls initialiseApplication on first mount', () => {
      expect(props.initialiseApplication.called).to.equal(true);
    });

    it('subscribes to pusher after mount', () => {
      expect(subscribe.called).to.equal(true);
    });

    it('binds to the pusher event subscription', () => {
      expect(bind.called).to.equal(true);
    });
    wrapper.unmount();
  });

  it('renders <LoadingView /> by default', () => {
    const wrapper = shallow(<Index {...props} />);
    expect(wrapper.find(LoadingView)).to.have.lengthOf(1);
  });

  it('renders <LineupView /> when loading prop is false', () => {
    const newProps = Object.assign({}, props, {
      loading: false,
      lineupData: { team: 'data' },
    });
    const wrapper = shallow(<Index {...newProps} />);
    expect(wrapper.find(LineupView).exists()).to.equal(true);
  });
});
