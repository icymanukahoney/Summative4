import {useState, useEffect} from 'react'
import axios from 'axios'
import { Hourglass } from 'react-loader-spinner'
import { Helmet } from 'react-helmet'

const baseUrl = import.meta.env.VITE_WP_API_BASEURL;

const Service = () => {

    // Loading state
  const [loading, setLoading] = useState(true)
  // Service state - they change based on the posts on the API
  const [services, setServices] = useState(null)

  const endpoint = `${baseUrl}/services?_embed`

  useEffect(() => {
    axios.get(`${endpoint}`)
    .then((res) => {
      console.log(res)
      setServices(res.data)
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

  function getFeaturedImage(service) {
    if (service && service._embedded && service._embedded['wp:featuredmedia'] && service._embedded['wp:featuredmedia'][0].source_url ) {
        return service._embedded['wp:featuredmedia'][0].source_url
    } else {
        return 'https://placehold.co/600x400'
    }
}

  const Services = ({ services }) => {
    
    const mappedServices = services.map((service, index) => {
      const type = service.acf.service_type
        //console.log("Service data:", services);
      return (
      <div key={service.slug + "-" + index} className="post-card">
         
         <div>
             <img src={getFeaturedImage(service)} alt="project-image" />
          </div>

        <div className='discover-btn'>
          <h4 className="title">{service.title.rendered}</h4>
          {/* <div dangerouslySetInnerHTML={{__html: service.excerpt.rendered}} /> */}
          {/* <div>Key: {service.slug + "-" + index}</div> */}
          <p>{type.toUpperCase()}</p> 
          <li key={service.slug + "-" + index}>
            <a href={`#/service/${service.id}`}>DISCOVER</a>
          </li>
        </div>
        
      </div>
      )
    })
    
    console.log({ mappedServices });
    
    return (
      <>
        {/* All our services are here! */}
        {mappedServices}
      </>
    )
  }
  return (
<>
<Helmet>
  <title>Colour Me Beautiful - SERVICES PAGE</title>
  <meta name="description" content="Helping individuals enhance their appearance through personalized colour analysis, makeup masterclasses, styling expertise, and consultations across New Zealand." />
  <meta name="keywords" content="colour analysis, colour consultation, style consultation, business image, mens makeover, style, colour, mens style, shopping, wardrobe, makeup lesson, group consultation " />
</Helmet>
<div className='container'>
      
   <div className="home-sections">
     <div className="who-consultant">
     <img src="/assets/service.jpg" className='home-section-image' alt="Colour Consultant Image" />
     </div>

     <div>
     <h4>OUR COLOUR ME BEAUTIFUL NZ SERVICES</h4>
     </div>
    </div>

  <div className='card-container'>
      <div id='cardCont' className='cardCont'>
        {loading ? <p>Loading...</p> : <Services services={services}/>}
      </div>
  </div>

</div>
</>
  )
}


export default Service
