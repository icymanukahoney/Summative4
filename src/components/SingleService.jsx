import {useState, useEffect} from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'
import {ArrowLeft} from 'react-bootstrap-icons'
import { Helmet } from 'react-helmet'

const baseUrl = import.meta.env.VITE_WP_API_BASEURL

const SingleService= () => {

    const {id} = useParams()
    // Loading state
    const [loading, setLoading] = useState(true)
    // set a state for the post
    const [service, setService] = useState(null)
    // call useNavigate
    const navigate = useNavigate()

    const handleFindConsultantClick = () => {
        navigate('/consultants')
      }

    // Set endpoint for a single post
    const endpoint = `${baseUrl}/services/${id}?_embed`

    // useEffect
    useEffect(() => {
        axios.get(`${endpoint}`)
        .then((res) => {
            setService(res.data)
            setLoading(false)
        })
        .catch((err) => console.log(err))
    }, [id])

    function getFeaturedImage(service) {
        if (service && service._embedded && service._embedded['wp:featuredmedia'] && service._embedded['wp:featuredmedia'][0].source_url ) {
            return service._embedded['wp:featuredmedia'][0].source_url
        } else {
            return 'https://placehold.co/600x400'
        }
    }

    if (loading) {
        return <>Loading...</>
    }


  return (
    <>
<Helmet>
  <title>Colour Me Beautiful - SERVICE PAGE</title>
  <meta name="description" content="Helping individuals enhance their appearance through personalized colour analysis, makeup masterclasses, styling expertise, and consultations across New Zealand." />
  <meta name="keywords" content="colour analysis, colour consultation, style consultation, business image, mens makeover, style, colour, shopping, wardrobe, makeup lesson, group consultation " />
</Helmet>

<div className='container'>

        <button className='back-button' onClick={() => navigate(-1)}><ArrowLeft/>Go Back</button>
         
         <h4>SERVICE</h4>

           <div key={service.slug} className='single-container'>

           <div className="img-single-post">
            <img src={getFeaturedImage(service)} alt="consultant image" />
           </div>

           <div>
            <h4 className='title'>{service.title.rendered}</h4>
            <div className='service-content' dangerouslySetInnerHTML={{__html: service.content.rendered}}/>
            </div>
        
            {/*<div className='key'>Key: {service.slug}</div>*/}
           </div>

           <div className='contact-container'>
            <button className='find-consultant' onClick={handleFindConsultantClick}>
               FIND A CONSULTANT 
            </button>
            </div>
        
</div>
</>
  )
}

export default SingleService
