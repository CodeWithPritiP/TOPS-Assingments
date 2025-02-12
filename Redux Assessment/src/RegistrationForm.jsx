import React from 'react';
import './style.css'
import { useDispatch, useSelector } from 'react-redux';
import { updateField, setError, clearErrors } from './redux/formSlice';

const validateField = (name, value, fields) => {
  switch (name) {
    case 'email':
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? null : 'Invalid email address';
    case 'password':
      return value.length >= 6 ? null : 'Password must be at least 6 characters long';
    case 'retypePassword':
      return value === fields.password ? null : 'Passwords do not match';
    case 'phoneNumber':
      return /^\d{10}$/.test(value) ? null : 'Invalid phone number';
    case 'postcode':
      return value.length > 0 ? null : 'Postcode is required';
    default:
      return value.trim() === '' ? 'This field is required' : null;
  }
};

const RegistrationForm = () => {
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.form);
  const { errors } = formData;

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Update field value
    dispatch(updateField({ name, value }));

    // Validate field
    const error = validateField(name, value, formData);
    dispatch(setError({ name, error }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(clearErrors());

    // Check for errors
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key], formData);
      if (error) newErrors[key] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      Object.entries(newErrors).forEach(([name, error]) =>
        dispatch(setError({ name, error }))
      );
      alert('Please fix the errors before submitting.');
    } else {
      alert('Form submitted successfully!');
      console.log(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      
    <div className="maincon">
        <h2>Register here</h2>
      <h3>USER REGISTRATION</h3>
      <p>Fields marked * are required.</p>
      <div>
        <label>Email *</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} />
        {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
      </div>

      <div>
        <label>Password *</label>
        <input type="password" name="password" value={formData.password} onChange={handleChange} />
        {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}
      </div>

      <div>
        <label>Retype Password *</label>
        <input
          type="password"
          name="retypePassword"
          value={formData.retypePassword}
          onChange={handleChange}
        />
        {errors.retypePassword && <p style={{ color: 'red' }}>{errors.retypePassword}</p>}
      </div>

      <div>
        <label>First Name *</label>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
        />
        {errors.firstName && <p style={{ color: 'red' }}>{errors.firstName}</p>}
      </div>

      <div>
        <label>Last Name *</label>
        <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
        {errors.lastName && <p style={{ color: 'red' }}>{errors.lastName}</p>}
      </div>

      <div>
        <label>Phone Number *</label>
        <input
          type="text"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
        />
        {errors.phoneNumber && <p style={{ color: 'red' }}>{errors.phoneNumber}</p>}
      </div>

      <div>
        <label>Address *</label>
        <input type="text" name="address" value={formData.address} onChange={handleChange} />
        {errors.address && <p style={{ color: 'red' }}>{errors.address}</p>}
      </div>

      <div>
        <label>Town</label>
        <input type="text" name="town" value={formData.town} onChange={handleChange} />
      </div>

      <div>
        <label>Region *</label>
        <input type="text" name="region" value={formData.region} onChange={handleChange} />
        {errors.region && <p style={{ color: 'red' }}>{errors.region}</p>}
      </div>

      <div>
        <label>Postcode / Zip *</label>
        <input type="text" name="postcode" value={formData.postcode} onChange={handleChange} />
        {errors.postcode && <p style={{ color: 'red' }}>{errors.postcode}</p>}
      </div>

      <div>
        <label>Country *</label>
        <select name="country" value={formData.country} onChange={handleChange}>
          <option value="United Kingdom">United Kingdom</option>
          <option value="United States">United States</option>
          <option value="India">India</option>
        </select>
      </div>

      <button type="submit">Register</button>
      </div>
    </form>
  );
};

export default RegistrationForm;
