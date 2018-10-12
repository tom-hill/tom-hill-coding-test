import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { LineupView } from '../LineupView';
import PitchLineup from '../../PitchLineup/PitchLineup';
import TableLineup from '../../TableLineup/TableLineup';

describe('<LineupView />', () => {
  const data = {};

  it('renders the pitch lineup on devices greater than 320px', () => {
    const browser = {
      is: {
        micro: false,
      },
      greaterThan: {
        micro: true,
      },
    };
    const wrapper = shallow(<LineupView data={data} browser={browser} />);
    expect(wrapper.find(PitchLineup)).to.have.length(1);
  });

  it('renders the table lineup on devices that are 320px or smaller', () => {
    const browser = {
      is: {
        micro: true,
      },
      greaterThan: {
        micro: false,
      },
    };
    const wrapper = shallow(<LineupView data={data} browser={browser} />);
    expect(wrapper.find(TableLineup)).to.have.length(1);
  });
});
