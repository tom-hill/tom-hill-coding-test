import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import PitchLineup from '../PitchLineup';
import Player from '../../Player/Player';
import json from '../../../../tools/test/match-lineups';

describe('<PitchLineup />', () => {
  const fourFourTwo = json.lineups.find(lineup => lineup.formation === '442');
  const threeFourTwoOne = json.lineups.find(lineup => lineup.formation === '3421');
  const fourFourOneOne = json.lineups.find(lineup => lineup.formation === '4411');

  it('always renders when provided with data', () => {
    const fft = shallow(<PitchLineup data={fourFourTwo} />);
    expect(fft.find(Player).length).to.be.above(1);

    const tfto = shallow(<PitchLineup data={threeFourTwoOne} />);
    expect(tfto.find(Player).length).to.be.above(1);

    const ffoo = shallow(<PitchLineup data={fourFourOneOne} />);
    expect(ffoo.find(Player).length).to.be.above(1);
  });

  describe('Render Lineup', () => {
    let fft;
    let tfto;
    let ffoo;
    beforeEach(() => {
      fft = sinon.stub(PitchLineup.prototype, 'renderFourFourTwo');
      tfto = sinon.stub(PitchLineup.prototype, 'renderThreeFourTwoOne');
      ffoo = sinon.stub(PitchLineup.prototype, 'renderFourFourOneOne');
    });

    afterEach(() => {
      fft.restore();
      tfto.restore();
      ffoo.restore();
    });

    it('Calls renderFourFourTwo() for a 442 formation', () => {
      const wrapper = shallow(<PitchLineup data={fourFourTwo} />);
      expect(fft.called).to.equal(true);
      expect(tfto.called).to.equal(false);
      expect(ffoo.called).to.equal(false);
      wrapper.unmount();
    });

    it('Calls renderThreeFourTwoOne() for a 4321 formation', () => {
      const wrapper = shallow(<PitchLineup data={threeFourTwoOne} />);
      expect(fft.called).to.equal(false);
      expect(tfto.called).to.equal(true);
      expect(ffoo.called).to.equal(false);
      wrapper.unmount();
    });

    it('Calls renderFourFourOneOne() for a 4411 formation', () => {
      const wrapper = shallow(<PitchLineup data={fourFourOneOne} />);
      expect(fft.called).to.equal(false);
      expect(tfto.called).to.equal(false);
      expect(ffoo.called).to.equal(true);
      wrapper.unmount();
    });

    it('Calls renderFourFourTwo() by default if no match', () => {
      const noMatch = Object.assign({}, fourFourOneOne, {
        formation: '532',
      });
      const wrapper = shallow(<PitchLineup data={noMatch} />);
      expect(fft.called).to.equal(true);
      expect(tfto.called).to.equal(false);
      expect(ffoo.called).to.equal(false);
      wrapper.unmount();
    });
  });

  describe('renderFourFourTwo()', () => {
    it('calls renderPositionLayout()', () => {
      const rpl = sinon.stub(PitchLineup.prototype, 'renderPositionLayout');
      new PitchLineup().renderFourFourTwo(fourFourTwo.players);
      expect(rpl.called).to.equal(true);
      rpl.restore();
    });
  });

  describe('renderThreeFourTwoOne()', () => {
    it('calls renderPositionLayout()', () => {
      const rpl = sinon.stub(PitchLineup.prototype, 'renderPositionLayout');
      new PitchLineup().renderThreeFourTwoOne(threeFourTwoOne.players);
      expect(rpl.called).to.equal(true);
      rpl.restore();
    });
  });

  describe('renderFourFourOneOne()', () => {
    it('calls renderPositionLayout()', () => {
      const rpl = sinon.stub(PitchLineup.prototype, 'renderPositionLayout');
      new PitchLineup().renderFourFourOneOne(fourFourOneOne.players);
      expect(rpl.called).to.equal(true);
      rpl.restore();
    });
  });

  describe('renderPositionLayout()', () => {
    it('calls renderPlayers()', () => {
      const positionLayout = [
        [null, 1, null],
        [2, 5, 6, 3],
        [7, 4, 8, 11],
        [null, 10, 9, null],
      ];

      const rp = sinon.stub(PitchLineup.prototype, 'renderPlayers');
      new PitchLineup().renderPositionLayout(positionLayout, fourFourTwo.players);
      expect(rp.callCount).to.equal(4); // Number of layout rows
      rp.restore();
    });
  });

  describe('renderPositionLayout()', () => {
    it('calls renderPlayers()', () => {
      const positionLayout = [
        [null, 1, null],
        [2, 5, 6, 3],
        [7, 4, 8, 11],
        [null, 10, 9, null],
      ];

      const rp = sinon.stub(PitchLineup.prototype, 'renderPlayers');
      new PitchLineup().renderPositionLayout(positionLayout, fourFourTwo);
      expect(rp.callCount).to.equal(4); // Number of layout rows
      rp.restore();
    });
  });

  describe('renderPlayers()', () => {
    const arrayOfPlayerComponents = new PitchLineup().renderPlayers(
      [null, 1, null],
      fourFourTwo,
      1,
    );

    it('renders the correct number of <Player>\'s per row', () => {
      expect(arrayOfPlayerComponents.length).to.equal(3);
    });

    it('render the correct number of "Blank" <Player>\'s', () => {
      expect(arrayOfPlayerComponents
        .filter(player => player.props.blank === true)
        .length).to.equal(2);
    });

    it('render the correct <Player>\'s', () => {
      expect(arrayOfPlayerComponents[1].props.data.name).to.equal('Hugo Lloris');
    });
  });
});
