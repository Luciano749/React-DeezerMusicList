import { useState, useEffect, useRef } from "react";
import { useSearchValue } from "../../context/SearchContext";
import { useFavoriteList } from "../../context/FavoriteContext";

const MusicList = () => {
  const [musicsA, setMusicsA] = useState([]);
  const [favoriteButtonColor, setFavoriteButtonColor] = useState("");
  const [isAudioPlaying, setIsAudioPlaying] = useState([false]);

  const buttonsRef = useRef([]);
  const audiosRef = useRef([]);
  const playButtonsRef = useRef([]);

  const { searchValue, setSearchValue } = useSearchValue("");
  const { favoriteList, setFavoriteList } = useFavoriteList([]);

  useEffect(() => {
    const CORS = "https://api.allorigins.win/raw?url=";

    fetch(CORS + "http://api.deezer.com/chart/0/tracks")
      .then((response) => response.json())
      .then((response) => {
        setMusicsA(response.data);
        console.log(response);
      });
  }, []);

  useEffect(() => {
    favoriteList.forEach((item) => {
      buttonsRef.current.forEach((btn) => {
        if (btn !== null) {
          if (item.id !== parseInt(btn.id)) btn.style.color = "#000000";
        }
      });
    });
  });

  useEffect(() => {
    favoriteList.forEach((item) => {
      buttonsRef.current.forEach((btn) => {
        if (btn !== null) {
          if (item.id === parseInt(btn.id)) btn.style.color = "red";
        }
      });
    });
  });

  useEffect(() => {
    if (favoriteList.length === 0) {
      buttonsRef.current.forEach((btn) => {
        btn.style.color = "#000000";
      });
    }
  });

  useEffect(() => {
    audiosRef.current.forEach((item) => {
      if (item !== null) item.volume = 0.1;
    });
  });

  useEffect(() => {
    for (let i = 0; i < audiosRef.current.length; i++) {
      setIsAudioPlaying((s) => [...s, false]);
    }
  }, []);

  const favorite = (e) => {
    musicsA.forEach((item) => {
      if (
        item.id === parseInt(e.target.id) &&
        favoriteList.includes(item) === false
      )
        setFavoriteList([...favoriteList, item]);
    });

    favoriteList.forEach((item) => {
      if (item.id === parseInt(e.target.id))
        setFavoriteList(
          favoriteList.filter((item) => item.id !== parseInt(e.target.id))
        );
    });
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
      {musicsA
        .filter((music) => {
          if (searchValue === "") return music;
          else if (
            music.title.toLowerCase().includes(searchValue.toLowerCase()) ||
            music.artist.name
              .toLowerCase()
              .includes(searchValue.toLowerCase()) ||
            music.album.title.toLowerCase().includes(searchValue.toLowerCase())
          )
            return music;
        })
        .map((item, idx) => (
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
                key={idx}
                id={item.id}
                className="favoriteButton"
                onClick={favorite}
                ref={(ref) => (buttonsRef.current[idx] = ref)}
              >
                &#10084;
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
        ))}
    </ul>
  );
};

export default MusicList;
