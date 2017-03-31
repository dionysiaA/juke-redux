import React from 'react';

const Lyrics = (props) => {

  const text = props.text;
  const setArtist = props.setArtist;
  const artistQuery = props.artistQuery;
  const setSong = props.setSong;
  const songQuery = props.songQuery;
  const handleSubmit = props.handleSubmit;

  const artistChange = event => {
    props.setArtist(event.target.value);
  };

  const songChange = event => {
    props.setSong(event.target.value);
  };

  return (
    <div id="lyrics">
      <form onSubmit={handleSubmit}>
        <div>
          <h4>Search Lyrics</h4>
          <input type="text" value={artistQuery} placeholder="Artist" onChange={artistChange} />
          <input type="text" value={songQuery} placeholder="Song" onChange={songChange} />
        </div>
        <pre>{text || 'Search above!'}</pre>
        <button type="submit">Search for Lyrics</button>
      </form>
    </div>
  )
}

export default Lyrics;
