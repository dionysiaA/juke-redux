import React from 'react';
import store from '../store';
import {fetchLyrics} from '../action-creators/lyrics';
import Lyrics from '../components/lyrics';

export default class LyricsContainer extends React.Component {

  constructor (props) {
    super(props);
    this.state = Object.assign({
      artistQuery: '',
      songQuery: ''
    }, store.getState());

    this.handleArtistInput = this.handleArtistInput.bind(this);
    this.handleSongInput = this.handleSongInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  handleArtistInput(artist) {
    this.setState({ artistQuery: artist })
  }

  handleSongInput(song) {
    this.setState({ songQuery: song })
  }

  handleSubmit() {
    event.preventDefault();
    if (this.state.artistQuery && this.state.songQuery) {
      store.dispatch(fetchLyrics(this.state.artistQuery, this.state.songQuery))
    }
  }

  componentDidMount(){
    this.unsubscribe = store.subscribe(() => {
        console.log('State changed!!', this.setState(store.getState()));
    });
  }

  componentWillUnmount(){
    this.unsubscribe();
  }

  render () {

    return (
      <Lyrics
        text={this.state.text}
        setArtist={this.handleArtistInput}
        setSong={this.handleSongInput}
        artistQuery={this.state.artistQuery}
        songQuery={this.state.songQuery}
        handleSubmit={this.handleSubmit}
      />
    );
  }
}

