import {RECEIVE_ALBUMS, RECEIVE_ALBUM} from '../constants'
import axios from 'axios';
import { convertAlbum, convertAlbums } from '../utils';

export const receiveAlbums = (albums) => {
  return {
    type: RECEIVE_ALBUMS,
    albums
  }
};

export const receiveAlbum = (album) => {
  return {
    type: RECEIVE_ALBUM,
    album
  }
};

export const getAlbums = function () {
  return function (dispatch, getState) {
    axios.get(`/api/albums`)
      .then(res => {
        dispatch(receiveAlbums(convertAlbums(res.data.albums)));
      });
  };
};

export const getAlbumsNoAjaxCall = function (albums) {
  return function (dispatch, getState) {
    dispatch(receiveAlbums(convertAlbums(albums)));
  };
};

export const selectAlbum = function (albumId) {
  return function (dispatch, getState) {
    axios.get(`/api/albums/${albumId}`)
      .then(res => res.data)
      .then(album => dispatch(receiveAlbum(convertAlbum(album))));
  };
};