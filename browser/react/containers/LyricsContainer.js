import React from 'react';
import store from '../store';
import {setLyrics} from '../action-creators/lyrics';

// const unsubscribe = store.subscribe(function () {
//   console.log('----------------');
//   console.log('State changed!!', store.getState());
// });
//
// store.dispatch(setLyrics('I can feel it coming in the air tonight ... hold on ...'));
// store.dispatch(setLyrics('Never gonna give you up, never gonna let you down'));
//
// unsubscribe();
//
// store.dispatch(setLyrics('Hello, darkness, my old friend.'));



export default class LyricsContainer extends React.Component {

  constructor (props) {
    super(props);
    this.state = store.getState();
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
      <h1>Just a container, more to come!</h1>
    );
  }
}

