import {useState, useEffect} from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'
import {ArrowLeft} from 'react-bootstrap-icons'
import { Hourglass } from 'react-loader-spinner'
import { Helmet } from 'react-helmet'

const baseUrl = import.meta.env.VITE_WP_API_BASEURL

const SingleTraining = () => {

    const {id} = useParams()
    // Loading state
    const [loading, setLoading] = useState(true)
    // set a state for the post
    const [training, setTraining] = useState(null)
    // call useNavigate
    const navigate = useNavigate()
   
  const handleContactUsClick = () => {
    navigate('/contact')
  }

    // Set endpoint for a single post
    const endpoint = `${baseUrl}/trainings/${id}?_embed`

    // useEffect
    useEffect(() => {
        axios.get(`${endpoint}`)
        .then((res) => {
            setTraining(res.data)
            setLoading(false)
        })
        .catch((err) => console.log(err))
    }, [id])

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

      function getFeaturedImage(training) {
        if (training && training._embedded && training._embedded['wp:featuredmedia'] && training._embedded['wp:featuredmedia'][0].source_url ) {
            return training._embedded['wp:featuredmedia'][0].source_url
        } else {
            return 'https://placehold.co/600x400'
        }
    }

  return (
  <>
<Helmet>
  <title>Colour Me Beautiful - TRAINING PAGE</title>
  <meta name="description" content="Helping individuals enhance their appearance through personalized colour analysis, makeup masterclasses, styling expertise, and consultations across New Zealand." />
  <meta name="keywords" content="stylist training, colour analysis training, colour analysis, colour consultation, style consultation, mens style, style, colour " />
</Helmet>

<div className='container'>

    <button className='back-button' onClick={() => navigate(-1)}><ArrowLeft/>Go Back</button>
        
    <h4 id='component'>TRAININGS</h4>

        <div key={training.slug} className='single-container'>
            
            <div className="img-single-post">
                 <img src={getFeaturedImage(training)} alt="" />
            </div>

            <div>
            <h4 id='training' className='title'>{training.title.rendered}</h4>
            <div className='training-content' dangerouslySetInnerHTML={{__html: training.content.rendered}}/>
            </div>

            </div>

            <div className='contact-container'>
               <button className='contact-btn' onClick={handleContactUsClick}>
                 CONTACT
               </button>
             </div>
            {/* <div className='key'>Key: {training.slug}</div> */}
        

</div>
   </>
  )
}
export default SingleTraining
