import { URL_Serch, KEY } from "../constants";
import { useState } from "react";
import "./index.css";

const Header = ({ setSearchData }) => {
  const [value, setValue] = useState("");

  async function getMovies(url) {
    const resp = await fetch(url, {
      headers: {
        "Content-Type": "application.json",
        "x-api-key": KEY,
      },
    });
    const respData = await resp.json();
    console.log(respData, "resp");
    
    setSearchData(respData.films);
  }
  const handleKeyPress = (e) => {
    if(e.key === "Enter"){
      const searchValue = `${URL_Serch}${value}`;
      if(!value){
        setSearchData(null)
      }
      else{
        getMovies(searchValue);
      }
      
    }
  }

  return (
    <div className="header">
      <h2>Movie App</h2>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <p style={{ fontWeight: 500 }}>Search</p>
        <input style={{ height: "25px" }} value={value} onChange={(e) => setValue(e.target.value)} onKeyDown={handleKeyPress}/>
      </div>
    </div>
  );
};

export default Header;
