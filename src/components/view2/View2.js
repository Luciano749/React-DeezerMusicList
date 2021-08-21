import { useState, useEffect, useRef } from "react";

import { useFavoriteList } from "../../context/FavoriteContext";

const TheFavoriteList = () => {
  const [isAudioPlaying, setIsAudioPlaying] = useState([]);

  const { favoriteList, setFavoriteList } = useFavoriteList();
  const audiosRef = useRef([]);
  const playButtonsRef = useRef([]);

  useEffect(() => {
    audiosRef.current.forEach((item) => (item.volume = 0.1));

    for (let i = 0; i < audiosRef.current.length; i++) {
      setIsAudioPlaying((s) => [...s, false]);
    }
  }, []);

  const deleteFavoriteMusic = (e) => {
    setFavoriteList(
      favoriteList.filter((item) => item.id !== parseInt(e.target.id))
    );
  };

  const playMusic = (e) => {
    const elId = parseInt(e.currentTarget.id);
    const arrCopy = isAudioPlaying.slice();

    audiosRef.current.forEach((item) => {
      item.pause();

      isAudioPlaying.forEach((audioBol, idx) => {
        isAudioPlaying[elId]
          ? audiosRef.current[elId].pause()
          : audiosRef.current[elId].play();

        if (
          audiosRef.current[elId].duration > 0 &&
          !audiosRef.current[elId].paused
        ) {
          arrCopy[idx] = false;
          setIsAudioPlaying(arrCopy);
          arrCopy[elId] = true;
          setIsAudioPlaying(arrCopy);
        } else {
          arrCopy[idx] = false;
          setIsAudioPlaying(arrCopy);
          arrCopy[elId] = false;
          setIsAudioPlaying(arrCopy);
        }
      });
    });
  };

  return (
    <ul>
      {favoriteList.length > 0 ? (
        favoriteList.map((item, idx) => (
          <li key={idx}>
            <h1 className="trackTitle">{item.title}</h1>

            <div className="imageArea">
              <div className="playAndImageArea">
                <img src={item.album.cover} alt={item.title} />
                <div className="blackBg">
                  <button
                    className="playButton"
                    id={idx}
                    ref={(ref) => (playButtonsRef.current[idx] = ref)}
                    onClick={playMusic}
                  >
                    ll
                  </button>
                </div>
              </div>

              <audio
                src={item.preview}
                ref={(ref) => (audiosRef.current[idx] = ref)}
              ></audio>

              <button
                id={item.id}
                className="deleteButton"
                onClick={deleteFavoriteMusic}
              >
                X
              </button>

              <a href={item.link} className="deezerLink">
                OUÇA COMPLETA NO DEEZER
              </a>
            </div>

            <div className="informations">
              <h3>
                Artist:<span>{item.artist.name}</span>
              </h3>

              <h3>
                Duration:
                <span>
                  {(item.duration / 60).toFixed(2).toString().replace(".", ":")}
                  s
                </span>
              </h3>

              <h3>
                Album: <span>{item.album.title}</span>
              </h3>
            </div>
          </li>
        ))
      ) : (
        <>
          <h1>VOCÊ AINDA NÃO TEM FAVORITOS</h1>
          <button className="backButton" onClick={() => window.history.back()}>
            &lt;
          </button>
        </>
      )}
    </ul>
  );
};
export default TheFavoriteList;
