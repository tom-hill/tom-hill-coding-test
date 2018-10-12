import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import Player from '../Player';
import json from '../../../../tools/test/match-lineups';
import styles from '../styles/player.scss';

describe('<Player />', () => {
  it('returns an empty <li> item when it is blank', () => {
    const wrapper = shallow(<Player blank />);
    expect(wrapper.find('li').children().length).to.equal(0);
  });

  it('renders a player card when it has data', () => {
    const wrapper = shallow(<Player data={json.lineups[0].players[0]} />);
    expect(wrapper.find(`.${styles.player__shirt}`).text()).to.equal('1');
    expect(wrapper.find(`.${styles.player__details}`).text()).to.equal('Hugo Lloris');
  });
});
