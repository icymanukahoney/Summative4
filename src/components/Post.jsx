import {useState, useEffect} from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'
import {ArrowLeft} from 'react-bootstrap-icons'
import { Hourglass } from 'react-loader-spinner'
import { Helmet } from 'react-helmet'

const baseUrl = import.meta.env.VITE_WP_API_BASEURL

const Post = () => {
    const {id} = useParams()
    // Loading state
    const [loading, setLoading] = useState(true)
    // set a state for the post
    const [post, setPost] = useState(null)
    // call useNavigate
    const navigate = useNavigate()

    const handleFindConsultantClick = () => {
      navigate('/consultants')
    }

    // Set endpoint for a single post
    const endpoint = `${baseUrl}/posts/${id}?_embed`

    // useEffect
    useEffect(() => {
        axios.get(`${endpoint}`)
        .then((res) => {
            setPost(res.data)
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

    function getFeaturedImage(post) {
        if (post && post._embedded && post._embedded['wp:featuredmedia'] && post._embedded['wp:featuredmedia'][0].source_url ) {
            return post._embedded['wp:featuredmedia'][0].source_url
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
  <title>Colour Me Beautiful - SERVICE </title>
  <meta name="description" content="Helping individuals enhance their appearance through personalized colour analysis, makeup masterclasses, styling expertise, and consultations across New Zealand." />
  <meta name="keywords" content="colour analysis, colour consultation, style consultation, business image, mens makeover, style, colour" />
  </Helmet>
<div className='container'>

  <button className='back-button' onClick={() => navigate(-1)}><ArrowLeft/>Go Back</button>
    
  <div key={post.slug} className="single-container">

    <div className="img-single-post">
     <img src={getFeaturedImage(post)} alt="project-image" />
    </div>

    <div>
      <h4 className='title'>{post.title.rendered}</h4>
      <div className='service-content' dangerouslySetInnerHTML={{__html: post.content.rendered}}/>
    </div>

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

export default Post
