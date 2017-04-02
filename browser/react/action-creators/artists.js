import {RECEIVE_ARTISTS, RECEIVE_ARTIST} from '../constants'
import axios from 'axios';
import { convertAlbums, convertSong } from '../utils';

export const receiveArtists = (artists) => {
  return {
    type: RECEIVE_ARTISTS,
    artists
  }
};

export const receiveArtist = (artist) => {
  return {
    type: RECEIVE_ARTIST,
    artist
  }
};

export const getArtists = function () {
  return function (dispatch, getState) {
    axios.get(`/api/artists`)
      .then(res => {
        dispatch(receiveArtists(res.data.artists));
      });
  };
};

export const getArtistsNoAjaxCall = function (artists) {
  return function (dispatch, getState) {
    dispatch(receiveArtists(artists));
  };
};

export const selectArtist = function (artistId) {
  return function (dispatch, getState) {
    Promise
      .all([
        axios.get(`/api/artists/${artistId}`),
        axios.get(`/api/artists/${artistId}/albums`),
        axios.get(`/api/artists/${artistId}/songs`)
      ])
      .then(res => res.map(r => r.data))
      .then(data => {
        let [artist, albums, songs]  = data;

        songs = songs.map(convertSong);
        albums = convertAlbums(albums);
        artist.albums = albums;
        artist.songs = songs;

        dispatch(receiveArtist(artist));
      });
  };
};
