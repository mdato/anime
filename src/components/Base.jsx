import React, { useEffect, useState } from "react";
import { AnimeList } from "./AnimeList";
import { AnimeInfo } from "./AnimeInfo";
import { AddToList } from "./AddToList";
import { RemoveFromList } from "./RemoveFromList";

function Base() {
  const [find, setFind] = useState("dragon ball");
  const [animeData, setAnimeData] = useState();
  const [animeInfo, setAnimeInfo] = useState();
  const [myAnimeList, setMyAnimeList] = useState([]);
  const [titleAnime, setTitleAnime] = useState("");

  const addTo = (anime) => {
    const index = myAnimeList.findIndex((myanime) => {
      return myanime.mal_id === anime.mal_id;
    });

    if (index < 0) {
      const newArray = [...myAnimeList, anime];
      setMyAnimeList(newArray);
    }
  };

  const removeFrom = (anime) => {
    const newArray = myAnimeList.filter((myanime) => {
      return myanime.mal_id !== anime.mal_id;
    });
    setMyAnimeList(newArray);
  };

  const getData = async () => {
    const res = await fetch(`https://api.jikan.moe/v4/anime?q=${find}&sfw`);
    const resData = await res.json();
    console.log(resData);
    if (resData != "undefined") {
      setAnimeData(resData.data);
      console.log(resData.data);
      if (resData.data[0].title.length > 0) {
        setTitleAnime(find);
      }
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleKeyPress = (e) => {
    console.log(e.key);
    if (e.key === "Enter") {
      e.preventDefault();
      console.log(e.key);
      getData();
    }
  };

  return (
    <>
      <div className="header">
        <h1>Anime List</h1>
        <div className="search-box">
          <input
            type="search"
            placeholder="find character"
            onKeyPress={handleKeyPress}
            onChange={(e) => setFind(e.target.value)}
          />
        </div>
      </div>

      <div className="container">
        <div className="animeInfo">
          {animeInfo && <AnimeInfo animeInfo={animeInfo} />}
        </div>

        <div className="anime-row">
          <div className="scroll1">
            <h2 className="text-heading">{titleAnime}</h2>
            <div className="row">
              <AnimeList
                animelist={animeData}
                setAnimeInfo={setAnimeInfo}
                animeComponent={AddToList}
                handleList={(anime) => addTo(anime)}
              />
            </div>
          </div>

          <div className="scroll2">
            <h2 className="list text-heading">My List</h2>
            <div className="row">
              <AnimeList
                animelist={myAnimeList}
                setAnimeInfo={setAnimeInfo}
                animeComponent={RemoveFromList}
                handleList={(anime) => removeFrom(anime)}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Base;
