import {useState} from 'react'
import axios from 'axios'
import { Helmet } from 'react-helmet'
import { useNavigate } from 'react-router-dom'
import {ArrowLeft} from 'react-bootstrap-icons'

const formEndpoint = import.meta.env.VITE_APP_WP_API_FORM_ENDPOINT

console.log(formEndpoint);

const ContactForm = () => {

    // setup state for contact form submission
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(false);
    // state for input values
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    
    const handleSubmit = (event) => {
        event.preventDefault()
        // object for our form - append data to it so we can send it
        const testForm = new FormData()
        testForm.append('your-name', name)
        testForm.append('your-email', email)
        testForm.append('your-message', message)

        // AXIOS CALL
        // first argument is the endpoint, second is the the form data:
        axios.post(formEndpoint, testForm, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        })
        .then(function (response) {
            console.log(response);
            // update state to show submitted
            setSubmitted(true);
        })
        .catch((error) => {
            console.log(error);
            setError(true)
        })
    }

    // Conditionals - if Submitted or if Error
    if (submitted) {
        return (
            <>
            <div className='contactMessage'>
                <h3>Thank you for your message!</h3>
                <p>It has been sent.</p>
            </div>
            </>
        )
    }

    if (submitted) {
        return (
            <>
            <div className='contactMessage'>
                <h3>Thank you for your message!</h3>
                <p>It has been sent.</p>
            </div>
            </>
        )
    }
     // Form to be returned
     return (
        <>
        <div className='form-group'>
            <form
            onSubmit={handleSubmit}
            method="POST"
            >
                 {/* Name input */}
                <div>
                <label htmlFor="name">NAME</label>
                <input
                    type="text"
                    name="name"
                    onChange={(event) => setName(event.target.value)}
                    value={name}
                    required
                />
                </div>
                {/* Email input */}
                <div>
                    <label htmlFor='email'>EMAIL</label>
                    <input
                        type="email"
                        name="email"
                        onChange={(event) => setEmail(event.target.value)}
                        value={email}
                        required
                    />
                </div>
                {/* Message input */}
                <div>
                    <label htmlFor='message'>MESSAGE</label>
                    <textarea className='message-cont'
                        name="message"
                        onChange={(event) => setMessage(event.target.value)}
                        value={message}
                        required
                    />
                </div>

                <div className='send-message-container'>
                    <button
                        className='subscribe'
                        type="submit"
                    > SEND MESSAGE</button>
                </div>
            </form>
            </div>
        </>
    )
    
}

const Contact = () => {
    const navigate = useNavigate()
  return (
    <>
<Helmet>
  <title>Colour Me Beautiful - CONTACT PAGE </title>
  <meta name="description" content="Helping individuals enhance their appearance through personalized colour analysis, makeup masterclasses, styling expertise, and consultations across New Zealand." />
  <meta name="keywords" content="send message, contact Colour Me Beautiful, colour analysis, colour consultant, stylist, style consultation, style, colour, makeup consultant" />
 </Helmet>
    <div id='contact-container' className='container'>
    <button className='back-button' onClick={() => navigate(-1)}><ArrowLeft/>Go Back</button>
        <div>
        <img src="/src/assets/contact.jpg" className='hero-image' alt="Sky Image" />
            <h4>CONTACT US</h4>
            <ContactForm/>
        </div>
    </div>
    </>
  )
}

export default Contact
