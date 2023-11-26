import {useState, useEffect} from 'react'
import {useParams, useNavigate, Link} from "react-router-dom"
import {ArrowLeft} from 'react-bootstrap-icons'
import axios from 'axios'
import { Hourglass } from 'react-loader-spinner'
import { Helmet } from 'react-helmet'

const baseUrl = import.meta.env.VITE_WP_API_BASEURL

const Areas = ({consultant}) => {
    const [taxonomies, setTaxonomies] = useState([])

    //const navigate = useNavigate();

    useEffect(() => {
        if (!consultant) {
            return
        }

        const taxonomyEndpoint = consultant._links["wp:term"][0].href

        axios.get(`${taxonomyEndpoint}`)
        .then((res) => {
            console.log('consultant taxonomy call')
            setTaxonomies(res.data)
        })
        .catch((err) => console.log(err))
    }, [consultant])

   const renderedTaxonomies = taxonomies.map((taxonomy, index) => {
        return (
            <Link to={`/area/${taxonomy.id}`} key={index}>
                <span className='taxonomy-term-pill'>
                    {taxonomy.name}
                </span>
            </Link>
        )
   })
   return (
    <div>
        {renderedTaxonomies}
    </div>
)
}

const Consultant = () => {
    const [consultant, setConsultant] = useState(null)
    const [loading, setLoading] = useState(true)
    const {id} = useParams()

    const navigate = useNavigate()
   
  const handleContactUsClick = () => {
    navigate('/contact')
  }

    const endpoint = `${baseUrl}/consultants/${id}?_embed`

    useEffect(() => {
        axios.get(`${endpoint}`)
        .then((res) => {
            console.log(res.data)
            setConsultant(res.data)
            setLoading(false)
        })
        .catch((err) => console.log(err))
    }, [endpoint])

    // set images
    function getFeaturedImage(consultant) {
        if (consultant && consultant._embedded && consultant._embedded['wp:featuredmedia'] && consultant._embedded['wp:featuredmedia'][0].source_url ) {
            return consultant._embedded['wp:featuredmedia'][0].source_url
        } else {
            return 'https://placehold.co/600x400'
        }
    }
    
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

  return (
    <>
<Helmet>
  <title>Colour Me Beautiful - CONSULTANT </title>
  <meta name="description" content="Helping individuals enhance their appearance through personalized colour analysis, makeup masterclasses, styling expertise, and consultations across New Zealand." />
  <meta name="keywords" content="colour analysis, colour consultant, stylist, style consultation, style, colour, makeup consultant" />
 </Helmet>
   
<div id='consultants' className='container'>
        <button className='back-button' onClick={() => navigate(-1)}><ArrowLeft/>Go Back</button>
        
        
    <h4 id='component'>CONSULTANT</h4>

        <div key={consultant.slug} id='consultant' className='single-container'>

            <div className="img-single-post">
             <img src={getFeaturedImage(consultant)} alt="Consultant Image"/>
            </div>

             <div>
             
                <div className='info-content'>
                 <h4 id='name-title' className='title'>{consultant.title.rendered}</h4>
                 <div className='info' dangerouslySetInnerHTML={{__html: consultant.content.rendered}}/>
                 <p>See all consultants in:</p>
                 <Areas consultant={consultant}/>
                </div>
             </div>

             <div className='contact-container'>
             <button className='contact-btn' onClick={handleContactUsClick}>
               CONTACT
               </button>
             </div>

        </div>
    

</div>
    </>
  )
}

export default Consultant
