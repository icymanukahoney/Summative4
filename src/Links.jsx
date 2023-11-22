import {Routes, Route} from 'react-router-dom'

// Import Pages
import Home from './pages/Home'
import Consultants from './pages/Consultants'
import Service from './pages/Service'
import Training from './pages/Training'
import Contact from './pages/Contact'

// Import Components
import Post from './components/Post'
import ConsultantsViaAreas from './pages/ConsultantsViaAreas'
import Consultant from './components/Consultant'
import SingleService from './components/SingleService'
import SingleTraining from './components/SingleTraining'

// Import Shop Pages
import Shopfront from './pages/Shopfront'
import Product from './components/Product'

const Links = () => {
  return (
    <Routes>
        <Route exact path='/' element={<Home/>}/>
        <Route path='/post/:id' element={<Post/>}/>
        <Route path='/consultants' element={<Consultants/>}/>
        <Route path='/area/:id' element={<ConsultantsViaAreas/>}/>
        <Route path='/consultants/:id' element={<Consultant/>}/>
        <Route path='/services/' element={<Service/>}/>
        <Route path='/service/:id' element={<SingleService/>}/>
        <Route path='/trainings/' element={<Training/>}/>
        <Route path='/training/:id' element={<SingleTraining/>}/>
        <Route path='contact' element={<Contact/>}/>
        

        {/* Shop Pages */}
        <Route path="/shop" element={<Shopfront/>}/>
        <Route path="/product/:id" element={<Product/>}/>

       

        
    </Routes>
  )
}

export default Links
