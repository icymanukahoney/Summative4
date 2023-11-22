import {useState, useEffect} from 'react'
import axios from 'axios'
import { Hourglass } from 'react-loader-spinner'
import { Helmet } from 'react-helmet'

const baseUrl = import.meta.env.VITE_WP_API_BASEURL;

const Training = () => {

    // Loading state
  const [loading, setLoading] = useState(true)
  // training state - they change based on the posts on the API
  const [trainings, setTrainings] = useState(null)

  const endpoint = `${baseUrl}/trainings?_embed`

  useEffect(() => {
    axios.get(`${endpoint}`)
    .then((res) => {
      console.log(res)
      setTrainings(res.data)
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

  function getFeaturedImage(training) {
    if (training && training._embedded && training._embedded['wp:featuredmedia'] && training._embedded['wp:featuredmedia'][0].source_url ) {
        return training._embedded['wp:featuredmedia'][0].source_url
    } else {
        return 'https://placehold.co/600x400'
    }
}

  const Trainings = ({ trainings }) => {
    
    const mappedTrainings = trainings.map((training, index) => {
      
        //console.log("Service data:", services);
      return (
        <div key={training.slug + "-" + index} className="post-card">

            <div>
             <img src={getFeaturedImage(training)} alt="project-image" />
            </div>

          <div className='discover-btn'>
            <h4 className="title">{training.title.rendered}</h4>
          {/* <div dangerouslySetInnerHTML={{__html: service.excerpt.rendered}} /> */}
          {/* <div>Key: {training.slug + "-" + index}</div> */}
         
           <li key={training.slug + "-" + index}>
            <a href={`#/training/${training.id}`}>DISCOVER</a>
           </li>
          </div>

        </div>
      )
    })
    
    console.log({ mappedTrainings });
    
    return (
      <>
<Helmet>
  <title>Colour Me Beautiful - TRAININGS PAGE</title>
  <meta name="description" content="Helping individuals enhance their appearance through personalized colour analysis, makeup masterclasses, styling expertise, and consultations across New Zealand." />
  <meta name="keywords" content="stylist training, colour analysis training, colour analysis, colour consultation, style consultation, mens style, style, colour " />
</Helmet>
        {/* All our trainings are here! */}
        {mappedTrainings}
      </>
    )
  }


  return (
    <div className='container'>

<div className="home-sections">
    <div className="who-consultant">
    <img src="/assets/training.jpg" className='home-section-image' alt="Colour Consultant Image" />
    </div>
    <div>
    <h4>TRAINING</h4>
    <p>Colour Me Beautiful New Zealand is recognized as one of the industry leaders in Personal 
       Colour and Style training.
       We offer training that is current and comprehensive. With our training you can style 
       yourself, your friends, add skills to your current career or start up an exciting and flexible 
       business for yourself as a personal colour consultant and stylist.
       If you love helping others, have great people skills,an interest in style or an eye for colour 
       and are self motivated with a positive attitude this could be a rewarding career for you.</p>
    </div>
  </div>
      
      <div id='trainingCont' className='cardCont'>
        {loading ? <p>Loading...</p> : <Trainings trainings={trainings}/>}
      </div>
    </div>
  )
}

export default Training
