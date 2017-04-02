import {RECEIVE_PLAYLISTS, RECEIVE_PLAYLIST} from '../constants'
import axios from 'axios';
import { convertSong } from '../utils';
import { hashHistory } from 'react-router';

export const receivePlaylists = (playlists) => {
  return {
    type: RECEIVE_PLAYLISTS,
    playlists
  }
};

export const receivePlaylist = (playlist) => {
  return {
    type: RECEIVE_PLAYLIST,
    playlist
  }
};

export const getPlaylists = function () {
  return function (dispatch, getState) {
    axios.get(`/api/playlists`)
      .then(res => {
        dispatch(receivePlaylists(res.data.playlists));
      });
  };
};

export const getPlaylistNoAjaxCall = function (playlists) {
  return function (dispatch, getState) {
    dispatch(receivePlaylists(playlists));
  };
};

export const addPlaylist = function (playlistName) {
  return function (dispatch, getState) {
     axios.post('/api/playlists', { name: playlistName })
      .then(res => res.data)
      .then(playlist => {
        dispatch(receivePlaylists([...getState().playlists.playlists, playlist]))
        hashHistory.push(`/playlists/${playlist.id}`)

        // this.setState({
        //   playlists: [...this.state.playlists, playlist]
        // }, () => {
        //   hashHistory.push(`/playlists/${playlist.id}`)
        // });
      });
  };
};

export const selectPlaylist =  (playlistId) =>
  (dispatch) => {
    axios.get(`/api/playlists/${playlistId}`)
      .then(res => res.data)
      .then(playlist => {
        playlist.songs = playlist.songs.map(convertSong);
        dispatch(receivePlaylist(playlist))
      });
  }

export const addSongToPlaylist = (playlistId, songId) =>
  (dispatch, getState) => {
    return axios.post(`/api/playlists/${playlistId}/songs`, {
      id: songId
      })
      .then(res => res.data)
      .then(song => {
        const selectedPlaylist = getState().playlists.selectedPlaylist;
        const songs = selectedPlaylist.songs;
        const newSongs = [...songs, convertSong(song)];
        const newSelectedPlaylist = Object.assign({}, selectedPlaylist, {
          songs: newSongs
        });
        dispatch(receivePlaylist(newSelectedPlaylist))

      });
  }