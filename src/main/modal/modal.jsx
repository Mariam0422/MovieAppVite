
import "./modal.css";

const Modal = ({details, close}) => {    

 
    return ( 
        <div className="modalMain">
           <img src={details.posterUrl}/>
           <div className="close" onClick={() => close()}>x</div>       
           <h2 style={{fontWeight:"600", color:"white"}}>{details.nameRu} - {details.year}</h2>
           <div className="text_sectiion">
           <p>Жанр - <span>{details.genres.map(el => el.genre).join(", ")}</span></p>
           <p>Время - <span>{details.filmLength} минут</span> </p>
           <p>Стана - <span>{details.countries.map(el => el.country).join(", ")}</span></p>
           <p>Сайт - <a>{details.webUrl}</a></p>
           <p>Описание - <span>{details.description}</span></p>
           </div>
        </div>
     );
}
 
export default Modal;