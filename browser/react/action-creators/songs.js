import {RECEIVE_SONGS} from '../constants';
import axios from 'axios';

export const receiveSongs = (songs) => {
  return {
    type: RECEIVE_SONGS,
    songs
  }
};

export const getSongs = function () {
  return function (dispatch, getState) {
    axios.get(`/api/songs`)
      .then(res => {
        dispatch(receiveSongs((res.data)));
      });
  };
};

