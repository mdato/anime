import React from "react";
import "./AnimeList.css";

export const AnimeList = ({
  animelist,
  setAnimeInfo,
  animeComponent,
  handleList,
}) => {
  const AddToList = animeComponent;

  return (
    <>
      {animelist
        ? animelist.map((anime, index) => {
            return (
              <div
                className="card"
                key={index}
                onClick={() => setAnimeInfo(anime)}
              >
                <img src={anime.images.jpg.large_image_url} alt="animeImage" />
                <div className="anime-info">
                  <h4>{anime.title}</h4>
                  <div className="overlay" onClick={() => handleList(anime)}>
                    <h5 className="title-overlay">{anime.title_japanese}</h5>
                    <div className="synopsis">
                      <p>Title: {anime.title}</p>
                      <p>Rank: {anime.rank}</p>
                      <p>Rating: {anime.rating}</p>
                      <p>Popularity: {anime.popularity}</p>
                      <p>Members: {anime.members}</p>
                      <p>Source: {anime.source}</p>
                      <p>Duration: {anime.duration}</p>
                      <p>Status: {anime.status}</p>
                      <p>Score: {anime.score}</p>
                      <h5 className="title-overlay">SYNOPSIS</h5>
                      <p>{anime.synopsis}</p>
                    </div>
                    <AddToList />
                  </div>
                </div>
              </div>
            );
          })
        : "Not Found"}
    </>
  );
};
