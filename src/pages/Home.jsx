import {useState, useEffect} from 'react'
import axios from 'axios'
import { Hourglass } from 'react-loader-spinner'; // import loading component from spinner 
import { Helmet } from 'react-helmet'
//import { Shop } from 'react-bootstrap-icons'
import { useNavigate } from 'react-router-dom'
import SubscriptionForm from './SubscriptionForm';



const baseUrl = import.meta.env.VITE_WP_API_BASEURL

const Home = () => {
 // Loading state
 const [loading, setLoading] = useState(true)
 // Posts state - they change based on the posts on the API
 const [posts, setPosts] = useState(null)

 

 const navigate = useNavigate()

  const handleGetColorsClick = () => {
    navigate('/shop')
  }

  const handleFindConsultantClick = () => {
    navigate('/consultants')
  }

  const handleDiscoverServiceClick = () => {
    navigate('services/')
  }

  const handleContactUsClick = () => {
    navigate('/contact')
  }

 const endpoint = `${baseUrl}/posts?_embed`

 useEffect(() => {
   axios.get(`${endpoint}`)
   .then((res) => {
     console.log(res.data)
     setPosts(res.data)
     setLoading(false)
     //const loader = setTimeout(() => setLoading(false), 2000) 
   })
   .catch((err) => console.log(err))
 }, [endpoint])

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

  function getFeaturedImage(post) {
    if (post && post._embedded && post._embedded['wp:featuredmedia'] && post._embedded['wp:featuredmedia'][0].source_url ) {
        return post._embedded['wp:featuredmedia'][0].source_url
    } else {
        return 'https://placehold.co/600x400'
    }
}

 const Posts = ({posts}) => {
   const mappedPosts = posts.map((post, index) => {
     return (
        
      <div key={post.slug + "-" + index} className='post-card'>
        
        <div>
         <img src={getFeaturedImage(post)} alt="" />
         </div>

         <div className='discover-btn'>
         <h4 className='title'>{post.title.rendered}</h4>
         <li key={post.slug + "-" + index}>
            <a href={`#/post/${post.id}`}>DISCOVER</a>
          </li>
        </div>

      </div> 
     )
   })

   return (
     <>
       {mappedPosts}
     </>
   )
 }

 // RETURN OF THE HOME COMPONENT
 return (
  <>
<Helmet>
  <title>Colour Me Beautiful - Home</title>
  <meta name="description" content="Helping individuals enhance their appearance through personalized colour analysis, makeup masterclasses, styling expertise, and consultations across New Zealand." />
  <meta name="keywords" content="colour analysis, colour consultation, style consultation, business image, mens makeover, style, colour" />
</Helmet>

<div className='container'>
   
    <div className="hero-section">
        <img src="/assets/hero.jpg" className='hero-image' alt="Hero Image" />
        <div className="slogan-container">
        <div className="small-slogan-container">
        <h3>Dress Your Life in 
          Every Shade!</h3>
        <button className='get-colours' onClick={handleGetColorsClick}>
          GET YOUR COLOURS
        </button>
        </div>
        </div>
    </div>

  <div className="home-sections">

  <div className="who-consultant">
    <img src="/assets/home-consult-image.jpg" className='home-section-image' alt="Colour Consultant Image" />
    <button className='find-consultant' onClick={handleFindConsultantClick}>FIND A CONSULTANT 
    </button>
  </div>
  <div>
    <h4>WHAT DOES A COLOUR CONSULTANT DO?</h4>
    <p>Colour has a substantial impact on the way we look and how we feel.
       Colours that complement us help us appear vibrant, younger and healthier.
       The colours we wear also impact on how others perceive us.
       During an individual colour consultation, your consultant will discuss with you 
       your lifestyle, the way you shop, your colour preferences and any problems you may 
       have with wearing certain colours.
       We then look at the way your hair, skin and eye colour interact to give you your 
       unique colouring and demonstrate which colours flatter you the most.
       We will discuss which colours should be selected for which garments to enhance your 
       personality and colouring and fit in with your lifestyle.You will also be shown 
       a make-up update in your best colours and receive a makeup chart and receive hair 
       colour and style advice with two to three images to show your hairdresser. Learn and 
       understand your dominant colouring or season, which colours suit you and equally 
       importantly which do not.Discover your best make-up colours and shades for you.
       Discover how to integrate the colours of the clothes you own with the ones you will 
       choose next time and how to coordinate your wardrobe colours.</p>
  </div>
  </div>

<  div className="home-sections">

  <div className="about-us">
    <img src="/assets/about.jpg" className='home-section-image' 
    alt="About Us Image" />
  </div>

  <div>
    <h4>ABOUT US</h4>
    <p>Colour Me Beautiful New Zealand is all about helping you find your confidence to feel and look your best. 
      We're proud to have helped many people find the image that they desire.
      Here in New Zealand, we have a growing team of colour and style consultants in both the North and South Islands.
      Whatever your image question we are here to help you find the answer.
      Do you need:
      - Make up advice
      - Personal image make over
      - A colour party for your friends
      - A presentation for your business or social organisation?
      Find and get in touch with your local CMB consultant to find how you can grow in confidence from a colour analysis, image analysis or a business consultation.
      All of our services can be tailored to your budget and time needs.</p>
      
      <div className='contact-container'>
        <button className='contact-btn' onClick={handleContactUsClick}>
          CONTACT
        </button>
      </div>

  </div>

</div>


    <div className='loading-container'>
        {loading && (
          <div className='hourglass-container'>
            <Hourglass visible={true} height={80} width={80} />
          </div>
        )}
    </div>

    <div id='homePostCont' className='card-container'>

    <div className='cardCont'>
     {!loading && <Posts posts={posts} />}
     </div>

     <button className='discover-service' onClick={handleDiscoverServiceClick}>
     DISCOVER ALL SERVICES
    </button>
    
    </div>

<div className="home-sections">
<div>
    <img src="/assets/owner.jpg" className='home-section-image' alt="Owner Image" />
</div>
<div>
    <h4>WELCOME TO COLOUR ME BEAUTIFUL NEW ZEALAND</h4>
    <p>We're here to help with your image transformation and train you to help others achieve the same.
       ​My journey with CMB began 28 years ago when as an already successful image consultant, I undertook 
      training in their extended seasonal system. I then updated to their incredible tonal system seven years ago.
      While I am still a passionate stylist at CMB, my commitment to the art of colour analysis and style consulting 
      lifted to a new level when I became the company owner and national trainer in New Zealand three years ago.
      We're passionate about helping you become the best version of who you can be. Whether it is our colour and style
      services you are looking for or joining our training academy to become a Colour Me Beautiful Colour & Style consultant, 
      the team are waiting to welcome you.</p>
    
    <h5>Trudy Van Zyl</h5>
</div>
</div>

<SubscriptionForm />

</div>
</>
 )
}

export default Home
