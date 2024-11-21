import { useState } from 'react'
import './App.css'
import Header from './main/header'
import MainSection from './main/mainSection'

function App() {
  const [searchData, setSearchData] = useState(null);

  return (
    <>    
    <Header setSearchData={setSearchData}/>
    <MainSection searchData={searchData}/>
    </>
  )
}

export default App
