import { useEffect, useState } from "react";
import { KEY, URL, API_URL_MOVIE_DETALIS } from "../constants";
import "./index.css";
import Modal from "../modal/modal";

const MainSection = ({ searchData }) => {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [movieDetail, setMovieDetail] = useState({});

  useEffect(() => {
    const handleClickClose = (event) => {
      if (open && !event.target.closest(".modalMain")) {
        setOpen(false);
      }
    };
    document.addEventListener("click", handleClickClose);
    return () => {
      document.removeEventListener("click", handleClickClose);
    };
  }, [open]);

  useEffect(() => {
    async function getMovies() {
      const resp = await fetch(URL, {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": KEY,
        },
      });
      const data = await resp.json();
      setData(data.items);
    }
    getMovies();
  }, []);

  async function openModal(id) {
    const resp = await fetch(API_URL_MOVIE_DETALIS + id, {
      headers: {
        "Content-Type": "application/json",
        "x-api-key": KEY,
      },
    });
    const dataDetails = await resp.json();
    setMovieDetail(dataDetails);
    console.log(dataDetails, "data");
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  };

  const moviesToDisplay = searchData ? searchData : data;
  return (
    <div className="mainSection">
      <div className="container" >
        {searchData && searchData.length === 0 ? (
          <div style={{height: "100vh"}}>
          <p  className="empty-message">Нет данных, соответствующих вашему запросу</p>
          </div>
        ) : (
          moviesToDisplay.map((item, index) => {
            return (
              <div
               style={open ? { filter: "blur(4px)" } : {}}
                key={index}
                className="cards"
                onClick={() => {
                  searchData
                    ? openModal(item.filmId)
                    : openModal(item.kinopoiskId);
                }}
              >
                <img src={item.posterUrlPreview} className="mainImg" />
                <h3>{item.nameRu}</h3>
                <p>{item.genres.map((itemG) => itemG.genre).join(", ")}</p>
              </div>
            );
          })
        )}
      </div>
      {open && <Modal details={movieDetail} close={handleClose} />}
    </div>
  );
};

export default MainSection;
