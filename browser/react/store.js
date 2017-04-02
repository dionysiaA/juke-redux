import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import lyricsReducer from './reducers/lyrics-reducer'
import playerReducer from './reducers/player-reducer'
import albumsReducer from './reducers/albums-reducer'
import artistsReducer from './reducers/artists-reducer'
import playlistsReducer from './reducers/playlists-reducer'
import songsReducer from './reducers/songs-reducer'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(combineReducers({
    lyrics: lyricsReducer,
    player: playerReducer,
    albums: albumsReducer,
    artists: artistsReducer,
    playlists: playlistsReducer,
    songs: songsReducer
  }),
  /* preloadedState, */ composeEnhancers(
  applyMiddleware(thunkMiddleware, createLogger())
));

export default store;
