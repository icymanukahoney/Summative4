import {useEffect, useState} from 'react'
import {Link, useParams, useNavigate} from 'react-router-dom'
import {ArrowLeft} from 'react-bootstrap-icons'
import axios from 'axios'
import { Helmet } from 'react-helmet'

const baseUrl = import.meta.env.VITE_WP_API_BASEURL

const AreaName = ({area}) => {
    return (
        <>
        <div>
            <h4 id='component'>All Consultants in {area.name}: </h4>
        </div>
        </>
    )
}

const AllConsultantsInArea = ({params}) => {
    const [consultants, setConsultants] = useState([])

    const endpoint = `${baseUrl}/consultants?area=${params.id}&_embed`

    useEffect(() => {
        axios.get(`${endpoint}`)
        .then((res) => {
            setConsultants(res.data)
        })
        .catch((err) => console.log(err))
    }, [endpoint])

    const renderedConsultants = consultants.map((consultant, index) => {

        function getFeaturedImage(consultant) {
        if (consultant && consultant._embedded && consultant._embedded['wp:featuredmedia'] && consultant._embedded['wp:featuredmedia'][0].source_url ) {
            return consultant._embedded['wp:featuredmedia'][0].source_url
        } else {
            return 'https://placehold.co/600x400'
        }
    }
        return (
            <div className='consultant-container item-container' key={index}>
                <div>
                <Link className='consultant-link' to={`/consultants/${consultant.id}`}>
                    <img src={getFeaturedImage(consultant)} alt={consultant.title.rendered} />
                    <h4 className='name'>{consultant.title.rendered}</h4>
                </Link>
                </div>
            </div>
        )
    })

    return (
        <>
         {renderedConsultants}
        </>
    )
}

const ConsultantsViaAreas = () => {
    const [area, setArea] = useState({})
    const params = useParams()
    const navigate = useNavigate()

    const areaEndpoint = `${baseUrl}/area/${params.id}`

    useEffect(() => {
        axios.get(`${areaEndpoint}`)
        .then((res) => {
            setArea(res.data)
        })
        .catch((err) => console.log(err))
    }, [areaEndpoint])

  return (
    <>
<Helmet>
  <title>Colour Me Beautiful - CONSULTANTS IN NEW ZEALAND </title>
  <meta name="description" content="Helping individuals enhance their appearance through personalized colour analysis, makeup masterclasses, styling expertise, and consultations across New Zealand." />
  <meta name="keywords" content="new zealand, colour analysis, colour consultant, stylist, style consultation, style, colour, makeup consultant" />
 </Helmet>
 <div className='container'>
    <div id="cons-via-area" className='page-container'>
        <button className='back-button' onClick={() => navigate(-1)}><ArrowLeft/>Go Back</button>
        
        
           <AreaName area={area}/>
           <div id="area-grid" className='grid-container'>
            <AllConsultantsInArea params={params}/>
           </div>
        
    </div>
    </div>
    </>
  )
}

export default ConsultantsViaAreas
