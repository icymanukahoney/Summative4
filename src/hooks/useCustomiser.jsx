import { useState, useEffect } from "react";
import axios from "axios";

const useCustomiser = () => {
    // variable for each setting from the customiser
    const [bgColor, setBgColor] = useState('');
    const [fontFamily, setFontFamily] = useState('');
    const [footColor, setFootColor] = useState('');
    const [fontColor, setFontColor] = useState('');
    const [navColor, setNavColor] = useState('');
    const [loading, setLoading] = useState(true);


    const baseUrl = import.meta.env.VITE_WP_BASEURL

   // Full customiser API Endpoint: 

   //http://localhost:8888/formative/wp-json/custom-theme/v1/customizer-settings

   // http://localhost/formative/wp-json/custom-theme/v1/customizer-settings

 
  useEffect(() => {

    

   axios.get(`${baseUrl}wp-json/custom-theme/v1/customizer-settings`)
   .then((response) => {


          

          const {backgroundColor, fontFamily, footerColor, fontElement, navbarColor} = response.data // add to the destructure

          
       
       setBgColor(backgroundColor)
       setFontFamily(fontFamily)
       // change the state to the destructure
       setFootColor(footerColor)
       setFontColor(fontElement)
       setNavColor(navbarColor)

       setLoading(false);


   })
   .catch((error) => {
       console.error('Error fetching customizer settings:', error)
       setLoading(false);
   })


   

}, [baseUrl])

return {bgColor, fontFamily, footColor, fontColor, navColor, loading } // add to retrun object
}

export default useCustomiser
