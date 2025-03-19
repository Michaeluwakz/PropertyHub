import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabase'

export default function PropertyDetailPage() {
  const { id } = useParams()
  const { user } = useAuth()
  const [property, setProperty] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isSaved, setIsSaved] = useState(false)
  const [savingProperty, setSavingProperty] = useState(false)
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: 'I am interested in this property and would like to schedule a viewing.',
  })
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    fetchProperty()
    if (user) {
      checkIfPropertyIsSaved()
    }
  }, [id, user])

  const fetchProperty = async () => {
    setLoading(true)
    try {
      // In a real implementation, you would fetch from Supabase
      // const { data, error } = await supabase
      //   .from('properties')
      //   .select('*, profiles(*)')
      //   .eq('id', id)
      //   .single()
      
      // if (error) throw error
      
      // Mock data for demonstration
      const mockProperty = {
        id: parseInt(id),
        title: 'Luxury 3 Bedroom Apartment',
        location: 'Lekki Phase 1, Lagos',
        price: 75000000,
        type: 'sale',
        property_type: 'apartment',
        bedrooms: 3,
        bathrooms: 3,
        area: 180,
        description: 'This beautiful luxury apartment features modern finishes and amenities. Located in the heart of Lekki Phase 1, it offers easy access to shopping centers, restaurants, and schools. The apartment includes a spacious living room, fully fitted kitchen, and a balcony with stunning views. Additional features include 24/7 security, constant power supply, and a swimming pool.',
        features: [
          'Swimming Pool',
          '24/7 Security',
          'Constant Power Supply',
          'Fully Fitted Kitchen',
          'Air Conditioning',
          'Parking Space',
          'CCTV Surveillance',
          'Gym',
        ],
        image_url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        additional_images: [
          'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1560185008-a33f5c7b1844?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        ],
        created_at: '2023-11-15T10:30:00Z',
        agent: {
          id: 'abc123',
          first_name: 'John',
          last_name: 'Doe',
          email: 'john.doe@example.com',
          phone_number: '+234 801 234 5678',
          profile_image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
        location_coordinates: [6.4351, 3.4500], // Lagos coordinates
      }
      
      setProperty(mockProperty)
    } catch (error) {
      console.error('Error fetching property:', error)
    } finally {
      setLoading(false)
    }
  }

  const checkIfPropertyIsSaved = async () => {
    try {
      // In a real implementation, you would check if the property is saved
      // const { data, error } = await supabase
      //   .from('saved_properties')
      //   .select('*')
      //   .eq('user_id', user.id)
      //   .eq('property_id', id)
      
      // if (error) throw error
      // setIsSaved(data.length > 0)
      
      // Mock data for demonstration
      setIsSaved(false)
    } catch (error) {
      console.error('Error checking saved property:', error)
    }
  }

  const handleSaveProperty = async () => {
    if (!user) {
      window.location.href = '/login'
      return
    }
    
    setSavingProperty(true)
    try {
      if (isSaved) {
        // Remove from saved properties
        // const { error } = await supabase
        //   .from('saved_properties')
        //   .delete()
        //   .eq('user_id', user.id)
        //   .eq('property_id', id)
        
        // if (error) throw error
        setIsSaved(false)
      } else {
        // Add to saved properties
        // const { error } = await supabase
        //   .from('saved_properties')
        //   .insert([
        //     { user_id: user.id, property_id: id }
        //   ])
        
        // if (error) throw error
        setIsSaved(true)
      }
    } catch (error) {
      console.error('Error saving property:', error)
    } finally {
      setSavingProperty(false)
    }
  }

  const handleContactFormChange = (e) => {
    const { name, value } = e.target
    setContactForm(prev => ({ ...prev, [name]: value }))
  }

  const handleContactFormSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    
    try {
      // In a real implementation, you would send a message to the agent
      // const { error } = await supabase
      //   .from('messages')
      //   .insert([
      //     {
      //       sender_id: user?.id || null,
      //       receiver_id: property.agent.id,
      //       property_id: property.id,
      //       name: contactForm.name,
      //       email: contactForm.email,
      //       phone: contactForm.phone,
      //       message: contactForm.message,
      //     }
      //   ])
      
      // if (error) throw error
      
      // Mock success
      setTimeout(() => {
        alert('Message sent successfully! The agent will contact you shortly.')
        setContactForm({
          ...contactForm,
          message: 'I am interested in this property and would like to schedule a viewing.',
        })
        setSubmitting(false)
      }, 1000)
    } catch (error) {
      console.error('Error sending message:', error)
      alert('Failed to send message. Please try again.')
      setSubmitting(false)
    }
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      maximumFractionDigits: 0
    }).format(price)
  }

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(dateString).toLocaleDateString('en-US', options)
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  if (!property) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h2 className="text-3xl font-bold text-gray-900">Property Not Found</h2>
        <p className="mt-4 text-gray-500">The property you're looking for doesn't exist or has been removed.</p>
        <div className="mt-8">
          <Link to="/properties" className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700">
            Browse Properties
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumbs */}
        <nav className="flex mb-4" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2">
            <li>
              <Link to="/" className="text-gray-500 hover:text-gray-700">Home</Link>
            </li>
            <li className="flex items-center">
              <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
              <Link to="/properties" className="ml-2 text-gray-500 hover:text-gray-700">Properties</Link>
            </li>
            <li className="flex items-center">
              <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
              <span className="ml-2 text-gray-700 font-medium">{property.title}</span>
            </li>
          </ol>
        </nav>
        
        {/* Property Title and Actions */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{property.title}</h1>
            <p className="text-lg text-gray-600 mt-1">{property.location}</p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center space-x-4">
            <span className="text-2xl font-bold text-primary-600">{formatPrice(property.price)}</span>
            <button
              onClick={handleSaveProperty}
              disabled={savingProperty}
              className={`flex items-center px-3 py-2 border rounded-md text-sm font-medium ${
                isSaved
                  ? 'bg-primary-100 text-primary-700 border-primary-300 hover:bg-primary-200'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
            >
              {savingProperty ? (
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-primary-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <svg className={`-ml-1 mr-2 h-5 w-5 ${isSaved ? 'text-primary-600' : 'text-gray-400'}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                </svg>
              )}
              {isSaved ? 'Saved' : 'Save'}
            </button>
            <button className="flex items-center px-3 py-2 border border-gray-300 rounded-md bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
              <svg className="-ml-1 mr-2 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
              </svg>
              Share
            </button>
          </div>
        </div>
        
        {/* Property Images */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="h-96 rounded-lg overflow-hidden">
            <img
              src={property.image_url}
              alt={property.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            {property.additional_images.map((image, index) => (
              <div key={index} className="h-44 rounded-lg overflow-hidden">
                <img
                  src={image}
                  alt={`${property.title} - Image ${index + 2}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
        
        {/* Property Details and Contact Form */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Property Details */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Property Details</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="flex flex-col">
                  <span className="text-gray-500 text-sm">Type</span>
                  <span className="font-medium">{property.property_type.charAt(0).toUpperCase() + property.property_type.slice(1)}</span>
                </div>
                {property.bedrooms > 0 && (
                  <div className="flex flex-col">
                    <span className="text-gray-500 text-sm">Bedrooms</span>
                    <span className="font-medium">{property.bedrooms}</span>
                  </div>
                )}
                {property.bathrooms > 0 && (
                  <div className="flex flex-col">
                    <span className="text-gray-500 text-sm">Bathrooms</span>
                    <span className="font-medium">{property.bathrooms}</span>
                  </div>
                )}
                <div className="flex flex-col">
                  <span className="text-gray-500 text-sm">Area</span>
                  <span className="font-medium">{property.area} sqm</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-gray-500 text-sm">Status</span>
                  <span className="font-medium">{property.type === 'sale' ? 'For Sale' : 'For Rent'}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-gray-500 text-sm">Listed</span>
                  <span className="font-medium">{formatDate(property.created_at)}</span>
                </div>
              </div>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
              <p className="text-gray-700 mb-6">{property.description}</p>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Features</h3>
              <ul className="grid grid-cols-2 gap-x-4 gap-y-2 mb-6">
                {property.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-gray-700">
                    <svg className="h-5 w-5 text-primary-500 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Location</h3>
              <div className="h-64 rounded-lg overflow-hidden mb-4">
                <MapContainer 
                  center={property.location_coordinates} 
                  zoom={13} 
                  style={{ height: '100%', width: '100%' }}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  <Marker position={property.location_coordinates}>
                    <Popup>
                      {property.title} <br /> {property.location}
                    </Popup>
                  </Marker>
                </MapContainer>
              </div>
            </div>
          </div>
          
          {/* Contact Form */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6 sticky top-6">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full overflow-hidden mr-4">
                  <img
                    src={property.agent.profile_image}
                    alt={`${property.agent.first_name} ${property.agent.last_name}`}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{property.agent.first_name} {property.agent.last_name}</h3>
                  <p className="text-gray-500 text-sm">Property Agent</p>
                </div>
              </div>
              
              <form onSubmit={handleContactFormSubmit}>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={contactForm.name}
                      onChange={handleContactFormChange}
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={contactForm.email}
                      onChange={handleContactFormChange}
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={contactForm.phone}
                      onChange={handleContactFormChange}
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={contactForm.message}
                      onChange={handleContactFormChange}
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                    />
                  </div>
                  
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  >
                    {submitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </>
                    ) : (
                      'Contact Agent'
                    )}
                  </button>
                </div>
              </form>
              
              <div className="mt-6 flex justify-center">
                <a
                  href={`tel:${property.agent.phone_number}`}
                  className="flex items-center text-primary-600 hover:text-primary-700"
                >
                  <svg className="h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  {property.agent.phone_number}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}