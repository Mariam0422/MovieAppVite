import { useEffect, useState } from "react";
import { KEY, URL, API_URL_MOVIE_DETALIS} from "../constants";
import { Modal } from "antd";
import "./index.css";



const MainSection = () => {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [movieDetail, setMovieDetail] = useState({});


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

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };

  return (
    <>
      <div className="container">
        {data.map((item) => {
          return (
            <div key={item.kinopoiskId} className="cards" onClick={() => openModal(item.kinopoiskId)}>            
              <img src={item.posterUrlPreview} />
              <h3>{item.nameRu}</h3>
              <p>{item.genres.map((itemG) => itemG.genre).join(", ")}</p>           
            </div>
          );
        })}
      </div>
      <Modal open={open} onCancel={handleCancel} movieDetail={movieDetail}>
        <img src={movieDetail.posterUrl}/>
      </Modal>
    </>
  );
};

export default MainSection;
