import {RECEIVE_SONGS} from '../constants';

export const initialSongsState = {
  songs: []
};

export default function (state = initialSongsState, action) {

  const newState = Object.assign({}, state);

  switch (action.type) {

    case RECEIVE_SONGS:
      newState.songs = action.songs;
      break;
    default:
      return state;

  }

  return newState;

}
