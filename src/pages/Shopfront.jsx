import {useEffect, useState} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { Hourglass } from 'react-loader-spinner'

//Product Endpoint from our env 
const productsUrl = import.meta.env.VITE_WC_PRODUCTS_URL;


const Shopfront = () => {
    const [products, setProducts] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        axios.get(`${productsUrl}`)
        .then((res) => {
            console.log(res.data)
            setProducts(res.data)
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

    const Products = ({products}) => {
        console.log({products})
        const mappedProducts = products.map((product, index) => {

            function getFeaturedImage(product) {
                if (product && product.images && product.images[0] ) {
                    return product.images[0].src
                } else {
                    return 'https://placehold.co/600x400'
                }
            } // end of getFeatured Image
            return (
                <div className='post-shop-container' key={index}>
                    <img className='product-image' src={getFeaturedImage(product)} alt="Product Image"/>
                    <Link className='product-link' to={`/product/${product.id}`}>
                    <h2 className='name'>{product.name}</h2>
                    </Link>
                    <h3 className='name'> was: 
                        ${((parseFloat(product.prices.regular_price)) / 100).toFixed(2)} {product.prices.currency_code}</h3>
                    <h4 className='name'> now:
                        ${((parseFloat(product.prices.sale_price)) / 100).toFixed(2)} {product.prices.currency_code}</h4>
                </div>
           ) // end of map return
        }) // end of map

         // return for products
        return (
            <>
                {mappedProducts}
            </>
        )
    }// end of Products

 // shopfront return
  return (
    <>
<Helmet>
  <title>Colour Me Beautiful - SHOP PAGE</title>
  <meta name="description" content="Helping individuals enhance their appearance through personalized colour analysis, makeup masterclasses, styling expertise, and consultations across New Zealand." />
  <meta name="keywords" content="fan, makeup, lipstick, powder, concealer, primer, moisturizer, colour analysis, colour consultation, style consultation, mens style, style, colour " />
</Helmet>
    <div className='loading-container'>
        {loading && (
          <div className='hourglass-container'>
            <Hourglass visible={true} height={80} width={80} />
          </div>
        )}
      </div>
<div id='shopfront' className='container'>
    <h4 id='component'>SHOP</h4> 
    <div id='shop-page' className='cons-shop-container'>
    
       <div id='homeCont' className='grid-container'>
            
            {!loading && <Products products={products} />}
       </div>
    </div>
</div>
</>
  )
}


export default Shopfront
