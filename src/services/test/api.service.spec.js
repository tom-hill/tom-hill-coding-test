import sha from 'crypto-js/sha3';
import AbortController from 'abort-controller';
import fetchMock from 'fetch-mock';
import * as API from '../api.service';

describe('API Service', () => {
  describe('makeRequestCancelable()', () => {
    it('returns an AbortController if one does not already exist', () => {
      expect(typeof API.makeRequestCancelable('url')).to.equal(typeof new AbortController());
    });

    it('cancels the request if a matching AbortController exists and the returns a new one', () => {
      const existing = window[sha('url')];
      const abort = sinon.stub(existing, 'abort');
      expect(existing).to.exist;

      const result = API.makeRequestCancelable('url');

      expect(abort.called).to.equal(true);
      expect(typeof result).to.equal(typeof new AbortController());
    });
  });

  describe('get()', () => {
    const data = 'data';
    beforeEach(() => {
      fetchMock.get('*', {
        status: 200,
        ok: true,
        body: data,
      });
    });

    afterEach(() => {
      fetchMock.restore();
    });

    it('responds with data', () => {
      API.get('url', {}, false).then((response) => {
        const json = response.body;

        if (response.ok) return json;

        throw new Error('Error');
      }).then((res) => {
        expect(res).to.equal(data);
      }).catch((e) => {
        console.log(e);
      });
    });
  });
});
