import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import TableLineup from '../TableLineup';
import json from '../../../../tools/test/match-lineups';

describe('<TableLineup />', () => {
  const fourFourTwo = json.lineups.find(lineup => lineup.formation === '442');
  it('renders a <table> or 11 players', () => {
    const wrapper = shallow(<TableLineup data={fourFourTwo} />);
    expect(wrapper.find('table').length).to.equal(1);
    expect(wrapper.find('thead').length).to.equal(1);
    expect(wrapper.find('th').length).to.equal(3);
    expect(wrapper.find('tbody').length).to.equal(1);
    expect(wrapper.find('tbody > tr').length).to.equal(11);
  });
});
