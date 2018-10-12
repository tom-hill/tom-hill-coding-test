import { get } from '../../services/api.service';
import * as Type from '../constants';
import Pusher from 'pusher';
import * as Consts from '../../components/constants';

export const appInitialised = () => ({
  type: Type.APP_INITIALISED,
});

export const appInitialisationError = error => ({
  type: Type.APP_INITIALISATION_ERROR,
  error,
});

export const newLineupReceived = data => ({
  type: Type.NEW_LINEUPS_RECEIVED,
  data,
});

export const slowConnection = () => ({
  type: Type.SLOW_CONNECTION,
});

export function initialiseApplication() {
  return function initialiseApplicationThunk(dispatch) {
    const timeout = setTimeout(() => dispatch(slowConnection()), 3000);

    return get('http://lineups.dev.fantech.io/')
      .then((data) => {
        clearTimeout(timeout);
        dispatch(newLineupReceived(data));
        dispatch(appInitialised());
        return new Pusher(Consts.PUSHER.APP_KEY, {
          cluster: Consts.PUSHER.APP_CLUSTER,
        });
      })
      .catch((e) => {
        clearTimeout(timeout);
        dispatch(appInitialisationError(e.toString()));
      });
  };
}
