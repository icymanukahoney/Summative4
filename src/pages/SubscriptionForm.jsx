import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const SubscriptionForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [subscribed, setSubscribed] = useState(false);

  const onSubmit = async (data) => {
    console.log('Form Data:', data);
  
    try {
      const formData = new FormData();
      formData.append('your-name', data.name);
      formData.append('your-email', data.email);
  
      const response = await axios.post(
        import.meta.env.VITE_APP_WP_API_FORM_ENDPOINT_143,
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );
  
      console.log(response.data);
  
      if (response.data.status === 'validation_failed') {
        // Handle validation errors
        const validationErrors = response.data.invalid_fields;
  
        validationErrors.forEach((error) => {
          // Update state or display error messages for each field
          console.log(`Validation Error for ${error.field}: ${error.message}`);
        });
      } else {
        // Form submitted successfully
        setSubscribed(true);
      }
    } catch (error) {
      console.error('Error submitting subscription:', error);
    }
  };
  
  

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group">
      <h3>SUBSCRIBE TO OUR NEWSLETTER</h3>
        <label>NAME</label>
        <input {...register('name', { required: 'Name is required' })} />
        {errors.name && <p>{errors.name.message}</p>}
      </div>

      <div className="form-group">
        <label>EMAIL</label>
        <input {...register('email', { required: 'Email is required', pattern: /^\S+@\S+$/i })} />
        {errors.email && <p>{errors.email.message}</p>}
      </div>

      {subscribed ? (
        <p>Thank you for subscribing!</p>
      ) : (
        <button className="subscribe" type="submit">SUBSCRIBE</button>
      )}
    </form>
  );
};

export default SubscriptionForm;
