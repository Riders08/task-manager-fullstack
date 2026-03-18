import { useEffect } from 'react'

import './App.css'

function App() {
  useEffect(() =>{
    fetch("http://localhost:3000")
    .then(res => res.text())
    .then(data => console.log(data))
  }, []);

  return <h1>Frontend Running</h1>

  
}

export default App;
