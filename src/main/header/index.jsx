import "./index.css";

const Header = () => {
    return ( 
        <div className="header">
         <h2>Movie App</h2>
         <div style={{display: "flex", alignItems: "center", gap: "10px"}}>
         <p style={{fontWeight: 500}}>Search</p>
         <input style={{height: "25px"}} />
         </div>
        </div>
     );
}
 
export default Header;