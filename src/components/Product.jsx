import {useState, useEffect} from 'react'
import {ArrowLeft} from "react-bootstrap-icons"
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Helmet } from 'react-helmet'
import { Hourglass } from 'react-loader-spinner'

// Products Url
const productsUrl = import.meta.env.VITE_WC_PRODUCTS_URL

const Product = () => {
    const {id} = useParams()
    const navigate = useNavigate()

    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)

    const endpoint = `${productsUrl}/${id}`

    useEffect(() => {
        axios.get(`${endpoint}`)
        .then((res) => {
            console.log(res.data)
            setProduct(res.data)
            setLoading(false)
        })
        .catch((err) => {
            console.log(err)
            //const loader = setTimeout(() => setLoading(false), 2000) 
            setLoading(false)
        })
    }, [endpoint])

    function getFeaturedImage(product) {
        if (product && product.images && product.images[0] ) {
            return product.images[0].src
        } else {
            return 'https://placehold.co/600x400'
        }
    } // end of getFeatured Image

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
  <title>Colour Me Beautiful - SHOP PAGE</title>
  <meta name="description" content="Helping individuals enhance their appearance through personalized colour analysis, makeup masterclasses, styling expertise, and consultations across New Zealand." />
  <meta name="keywords" content="fan, makeup, lipstick, powder, concealer, primer, moisturizer, colour analysis, colour consultation, style consultation, mens style, style, colour " />
</Helmet>

<div id="shop-page" className='container'>

            <button className='back-button' onClick={() => navigate(-1)}><ArrowLeft/>Go Back</button>
            
    <div className='single-container'>

           <div className="img-single-post">
             <div>
             <img className='product-image' src={getFeaturedImage(product)} alt="Product Image"/>
             </div>
            
             <h4 id='product' className='name'>{product.name}</h4>
             <h3>${((parseFloat(product.prices.price)) / 100).toFixed(2)}</h3>
           </div>
       
           <div>
              <div className='product-content' id="product-description"
              dangerouslySetInnerHTML={{__html: product.description}}/>
           </div>

           <div className='contact-container'>
               <button className='buy-btn' >
               ADD
               </button>
             </div>
    </div>

</div>
</>
  )
}
export default Product


