import { useEffect } from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import useCustomiser from './hooks/useCustomiser'

import Header from './components/Header'
import Footer from './components/Footer'
import Links from './Links'

function App() {
  const {bgColor, fontFamily, footColor, fontColor, navColor} = useCustomiser()

  useEffect(() => {

    console.log("bgColor:", bgColor);
  console.log("fontFamily:", fontFamily);
  console.log("footColor:", footColor);
  console.log("fontColor:", fontColor);
  console.log("navColor:", navColor);




// apply the bg color
document.body.style.backgroundColor = `#${bgColor}`

// Change the font based on the returned value
if (fontFamily === 'Abel') {
  document.body.style.fontFamily = `'Abel', sans-serif`
}
if (fontFamily === 'Cinzel') {
  document.body.style.fontFamily = `'Cinzel', serif`
}
if (fontFamily === 'Zilla Slab') {
  document.body.style.fontFamily = `'Zilla Slab', serif`
}
if (fontFamily === 'Crimson Text') {
  document.body.style.fontFamily = `'Crimson Text', serif`
}
if (fontFamily === 'Nunito') {
  document.body.style.fontFamily = `'Nunito', sans-serif`
}
if (fontFamily === 'Playfair Display') {
  document.body.style.fontFamily = `'Playfair Display', serif`
}
if (fontFamily === 'Merriweather') {
  document.body.style.fontFamily = `'Merriweather', serif`
}
if (fontFamily === 'Nanum Myeongjo') {
  document.body.style.fontFamily = `'Nanum Myeongjo', serif`
}

 // change footer colour
 document.getElementById("footer").style.backgroundColor = `${footColor}`

 // change font colour
 //document.getElementById("font").style.color = `${fontColor}`

 document.body.style.color = fontColor;
 


 // change navbar colour
 document.getElementById("topnav").style.backgroundColor = `${navColor}`


  }, [bgColor, fontFamily, footColor, fontColor, navColor])

  return (
    <HashRouter>
      <Header/>
      <Links/>
      <Footer/>
    </HashRouter>
  )
}

export default App
