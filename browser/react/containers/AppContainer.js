import React, { Component } from 'react';
import axios from 'axios';
import initialState from '../initialState';
import AUDIO from '../audio';
import store from '../store';
import * as player from '../action-creators/player';
import * as actionAlbums from '../action-creators/albums';
import * as actionArtists from '../action-creators/artists';
import * as actionPlaylists from '../action-creators/playlists';
import * as actionSongs from '../action-creators/songs';
import Sidebar from '../components/Sidebar';
import Player from '../components/Player';

export default class AppContainer extends Component {

  constructor (props) {
    super(props);
    this.state = Object.assign({}, initialState, store.getState());

    this.toggle = this.toggle.bind(this);
    this.toggleOne = this.toggleOne.bind(this);
    this.next = this.next.bind(this);
    this.prev = this.prev.bind(this);
    this.selectAlbum = this.selectAlbum.bind(this);
    this.selectArtist = this.selectArtist.bind(this);
    this.addPlaylist = this.addPlaylist.bind(this);
    this.selectPlaylist = this.selectPlaylist.bind(this);
    this.loadSongs = this.loadSongs.bind(this);
    this.addSongToPlaylist = this.addSongToPlaylist.bind(this);
  }

  componentWillUnmount(){
    this.unsubscribe();
  }
  componentDidMount () {

    this.unsubscribe = store.subscribe(() => {
      console.log('State changed!!', this.setState(store.getState()));
    });

    Promise
      .all([
        axios.get('/api/albums/'),
        axios.get('/api/artists/'),
        axios.get('/api/playlists')
      ])
      .then(res => res.map(r => r.data))
      .then(data => this.onLoad(...data));

    AUDIO.addEventListener('ended', () =>
      this.next());
    AUDIO.addEventListener('timeupdate', () =>
      this.setProgress(AUDIO.currentTime / AUDIO.duration));
  }

  onLoad (albums, artists, playlists) {
    store.dispatch(actionAlbums.getAlbumsNoAjaxCall(albums));
    store.dispatch(actionArtists.getArtistsNoAjaxCall(artists));
    store.dispatch(actionPlaylists.getPlaylistNoAjaxCall(playlists));
  }

  play () {
    store.dispatch(player.play())
  }

  pause () {
    store.dispatch(player.pause())
  }

  load (currentSong, currentSongList) {
    store.dispatch(player.load(currentSong, currentSongList))
  }

  startSong (song, list) {
    store.dispatch(player.startSong(song, list))
  }

  toggleOne (selectedSong, selectedSongList) {
    store.dispatch(player.toggleOne(selectedSong, selectedSongList))
  }

  toggle () {
    store.dispatch(player.toggle())
  }

  next () {
    store.dispatch(player.next())
  }

  prev () {
    store.dispatch(player.prev())
  }

  setProgress (progress) {
    store.dispatch(player.setProgress(progress))
  }

  selectAlbum (albumId) {
    store.dispatch(actionAlbums.selectAlbum(albumId));
  }

  selectArtist (artistId) {
   store.dispatch(actionArtists.selectArtist(artistId));
  }

  addPlaylist (playlistName) {
    store.dispatch(actionPlaylists.addPlaylist(playlistName));
  }

  selectPlaylist (playlistId) {
     store.dispatch(actionPlaylists.selectPlaylist(playlistId));
  }

  loadSongs (songs) {
    store.dispatch(actionSongs.getSongs())
  }

  addSongToPlaylist (playlistId, songId) {
    return store.dispatch(actionPlaylists.addSongToPlaylist(playlistId, songId));
  }

  render () {

    const props = Object.assign({}, this.state, {
      toggleOne: this.toggleOne,
      toggle: this.toggle,
      selectAlbum: this.selectAlbum,
      selectArtist: this.selectArtist,
      addPlaylist: this.addPlaylist,
      selectPlaylist: this.selectPlaylist,
      loadSongs: this.loadSongs,
      addSongToPlaylist: this.addSongToPlaylist
    });

    return (
      <div id="main" className="container-fluid">
        <div className="col-xs-2">
          {/*TODO: fix the sidebar here*/}
          <Sidebar playlists={this.state.playlists.playlists} />
        </div>
        <div className="col-xs-10">
        {
          this.props.children && React.cloneElement(this.props.children, props)
        }
        </div>
        <Player
          currentSong={this.state.player.currentSong}
          currentSongList={this.state.player.currentSongList}
          isPlaying={this.state.player.isPlaying}
          progress={this.state.player.progress}
          next={this.next}
          prev={this.prev}
          toggle={this.toggle}
        />
      </div>
    );
  }
}
