import React from 'react';

const Songs = (props) => {

  console.log(props, 'props in songs');
  const songs = props.songs;
  const currentSong = (props.player) ? props.player.currentSong : props.currentSong;
  const isPlaying = (props.player) ? props.player.isPlaying : props.isPlaying;
  const toggle = props.toggleOne;
  console.log(props.toggleOne, 'toggle!')
  return (
    <table className='table'>
      <thead>
        <tr>
          <th></th>
          <th>Name</th>
          <th>Artists</th>
          <th>Genre</th>
        </tr>
      </thead>
      <tbody>
        {  songs && songs.map(song => (
            <tr key={song.id}>
              <td>
                <button className="btn btn-default btn-xs" onClick={() => toggle(song, songs)}>
                  <span className={song.id === currentSong.id && isPlaying ? "glyphicon glyphicon-pause" : "glyphicon glyphicon-play"}></span>
                </button>
              </td>
              <td>{ song.name }</td>
              <td>
                <span>{ song.artists ? song.artists.map(artist => artist.name).join(', ') : null }</span>
              </td>
              <td>{ song.genre }</td>
            </tr>
          ))
        }
      </tbody>
    </table>
  );
}

export default Songs;
