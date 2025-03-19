import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabase'
import toast from 'react-hot-toast'

export default function SavedPropertiesPage() {
  const { user } = useAuth()
  const [savedProperties, setSavedProperties] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      fetchSavedProperties()
    }
  }, [user])

  const fetchSavedProperties = async () => {
    setLoading(true)
    try {
      // In a real implementation, you would fetch from Supabase
      // const { data, error } = await supabase
      //   .from('saved_properties')
      //   .select('*, properties(*)')
      //   .eq('user_id', user.id)
      
      // if (error) throw error
      
      // Mock data for demonstration
      const mockProperties = [
        {
          id: 1,
          property: {
            id: 1,
            title: 'Luxury 3 Bedroom Apartment',
            location: 'Lekki Phase 1, Lagos',
            price: 75000000,
            type: 'sale',
            property_type: 'apartment',
            bedrooms: 3,
            bathrooms: 3,
            area: 180,
            image_url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
          }
        },
        {
          id: 2,
          property: {
            id: 3,
            title: 'Spacious 4 Bedroom Duplex',
            location: 'Banana Island, Lagos',
            price: 250000000,
            type: 'sale',
            property_type: 'house',
            bedrooms: 4,
            bathrooms: 5,
            area: 350,
            image_url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
          }
        },
      ]
      
      setSavedProperties(mockProperties)
    } catch (error) {
      console.error('Error fetching saved properties:', error)
      toast.error('Failed to load saved properties')
    } finally {
      setLoading(false)
    }
  }

  const removeSavedProperty = async (id) => {
    try {
      // In a real implementation, you would delete from Supabase
      // const { error } = await supabase
      //   .from('saved_properties')
      //   .delete()
      //   .eq('id', id)
      
      // if (error) throw error
      
      // Update local state
      setSavedProperties(savedProperties.filter(item => item.id !== id))
      toast.success('Property removed from saved list')
    } catch (error) {
      console.error('Error removing saved property:', error)
      toast.error('Failed to remove property')
    }
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      maximumFractionDigits: 0
    }).format(price)
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="md:flex md:items-center md:justify-between mb-6">
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
              Saved Properties
            </h2>
          </div>
        </div>
        
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
          </div>
        ) : savedProperties.length === 0 ? (
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-12 sm:px-6 text-center">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
              <h3 className="mt-2 text-lg font-medium text-gray-900">No saved properties</h3>
              <p className="mt-1 text-sm text-gray-500">
                You haven't saved any properties yet. Browse properties and click the save button to add them here.
              </p>
              <div className="mt-6">
                <Link
                  to="/properties"
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  Browse Properties
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {savedProperties.map((item) => (
              <div key={item.id} className="bg-white overflow-hidden shadow rounded-lg">
                <div className="relative h-48">
                  <img
                    className="h-full w-full object-cover"
                    src={item.property.image_url}
                    alt={item.property.title}
                  />
                  <div className="absolute top-0 right-0 bg-primary-600 text-white px-3 py-1 m-2 rounded-md text-sm font-medium">
                    {item.property.type === 'sale' ? 'For Sale' : 'For Rent'}
                  </div>
                  <button
                    onClick={() => removeSavedProperty(item.id)}
                    className="absolute top-0 left-0 bg-white text-gray-700 p-2 m-2 rounded-full shadow hover:bg-gray-100"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900">{item.property.title}</h3>
                  <p className="text-gray-500">{item.property.location}</p>
                  <p className="mt-2 text-xl font-bold text-primary-600">{formatPrice(item.property.price)}</p>
                  <div className="mt-4 flex justify-between text-sm text-gray-500">
                    {item.property.bedrooms > 0 && (
                      <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        {item.property.bedrooms} Beds
                      </div>
                    )}
                    {item.property.bathrooms > 0 && (
                      <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {item.property.bathrooms} Baths
                      </div>
                    )}
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
                      </svg>
                      {item.property.area} sqm
                    </div>
                  </div>
                  <div className="mt-6">
                    <Link
                      to={`/properties/${item.property.id}`}
                      className="w-full flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-primary-700 bg-primary-100 hover:bg-primary-200"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}