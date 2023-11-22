import {useEffect, useState} from 'react'
import axios from 'axios'
import { Hourglass } from 'react-loader-spinner'
import { Helmet } from 'react-helmet'

const baseUrl = import.meta.env.VITE_WP_API_BASEURL
console.log(baseUrl);

const Consultants = () => {
    const [loading, setLoading] = useState(true)
    const [consultants, setConsultants] = useState(null)

    const endpoint = `${baseUrl}/consultants?_embed`

    useEffect(() => {
        axios.get(endpoint)
        .then((res) => {
            console.log(res.data)
            setConsultants(res.data)
            setLoading(false)
        })
        .catch((err) => console.log(err))
    }, [])

    if (loading) {
        return (
          <div className="loader-container">
            <Hourglass
              visible={true}
              height={80}
              width={80}
              ariaLabel="hourglass-loading"
              wrapperStyle={{}}
              wrapperClass=""
              colors={['#306cce', '#72a1ed']}
            />
          </div>
        );
      }

    function getFeaturedImage(consultant) {
        if (consultant && consultant._embedded && consultant._embedded['wp:featuredmedia'] && consultant._embedded['wp:featuredmedia'][0].source_url ) {
            return consultant._embedded['wp:featuredmedia'][0].source_url
        } else {
            return 'https://placehold.co/600x400'
        }
    }

    const Consultants = ({consultants}) => {
        const mappedConsultants = consultants.map((consultant, index) => {
            return (
               
                <div key={consultant.slug + "-" + index} className='post-shop-container'>
                     <img src={getFeaturedImage(consultant)} alt="consultant-image" />
                    <h4 className='title'>{consultant.title.rendered}</h4>
                    <li>
                        <a href={`#/consultants/${consultant.id}`}>Read More</a>
                    </li>
                </div>
             
            )
        })
        return (
            <>
                {mappedConsultants}
            </>
        )
    }



  return (
    <>
<Helmet>
  <title>Colour Me Beautiful - CONSULTANTS </title>
  <meta name="description" content="Helping individuals enhance their appearance through personalized colour analysis, makeup masterclasses, styling expertise, and consultations across New Zealand." />
  <meta name="keywords" content="find stylist, colour analysis, colour consultant, stylist, style consultation, style, colour, makeup consultant" />
 </Helmet>
<div className='container'>

  <div className="home-sections">
  <div className="who-consultant">
    <img src="/assets/cons.jpg" className='home-section-image' alt="Colour Consultant Image" />
   </div>
   <div>
    <h4>OUR COLOUR ME BEAUTIFUL NZ CONSULTANTS </h4>
    <p>Do you want to look and feel great? 
       Talk to one of our friendly professionally trained 
       Colour Me Beautiful New Zealand consultants.</p>
  </div>
 </div>

  <div className='cons-shop-container'>
    <div id='homeCont' className='homeCont'>
        {loading ? <p>Loading...</p> : <Consultants consultants={consultants}/>}
    </div>
  </div>
</div>
</>
  )
}

export default Consultants
