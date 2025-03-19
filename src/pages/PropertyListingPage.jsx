import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { supabase } from '../lib/supabase'

export default function PropertyListingPage() {
  const [searchParams] = useSearchParams()
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    type: searchParams.get('type') || '',
    location: searchParams.get('location') || '',
    propertyType: searchParams.get('propertyType') || '',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    bedrooms: searchParams.get('bedrooms') || '',
    bathrooms: searchParams.get('bathrooms') || '',
  })

  useEffect(() => {
    fetchProperties()
  }, [filters])

  const fetchProperties = async () => {
    setLoading(true)
    try {
      // This is a placeholder for the actual Supabase query
      // In a real implementation, you would build a query based on the filters
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (error) throw error
      
      // For now, we'll use mock data
      const mockProperties = [
        {
          id: 1,
          title: 'Luxury 3 Bedroom Apartment',
          location: 'Lekki Phase 1, Lagos',
          price: 75000000,
          type: 'sale',
          property_type: 'apartment',
          bedrooms: 3,
          bathrooms: 3,
          area: 180,
          description: 'Beautiful luxury apartment with modern finishes and amenities.',
          image_url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        },
        {
          id: 2,
          title: 'Modern 2 Bedroom Flat',
          location: 'Ikeja GRA, Lagos',
          price: 45000000,
          type: 'sale',
          property_type: 'apartment',
          bedrooms: 2,
          bathrooms: 2,
          area: 120,
          description: 'Spacious 2 bedroom flat in a serene environment.',
          image_url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        },
        {
          id: 3,
          title: 'Spacious 4 Bedroom Duplex',
          location: 'Banana Island, Lagos',
          price: 250000000,
          type: 'sale',
          property_type: 'house',
          bedrooms: 4,
          bathrooms: 5,
          area: 350,
          description: 'Luxurious 4 bedroom duplex with swimming pool and garden.',
          image_url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        },
        {
          id: 4,
          title: '3 Bedroom Apartment for Rent',
          location: 'Victoria Island, Lagos',
          price: 5000000,
          type: 'rent',
          property_type: 'apartment',
          bedrooms: 3,
          bathrooms: 3,
          area: 150,
          description: 'Fully furnished 3 bedroom apartment available for rent.',
          image_url: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        },
        {
          id: 5,
          title: 'Commercial Space',
          location: 'Ikoyi, Lagos',
          price: 120000000,
          type: 'sale',
          property_type: 'commercial',
          bedrooms: 0,
          bathrooms: 2,
          area: 250,
          description: 'Prime commercial space suitable for office or retail.',
          image_url: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        },
        {
          id: 6,
          title: 'Residential Land',
          location: 'Ajah, Lagos',
          price: 35000000,
          type: 'sale',
          property_type: 'land',
          bedrooms: 0,
          bathrooms: 0,
          area: 600,
          description: 'Prime residential land with C of O.',
          image_url: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        },
      ]
      
      // Apply filters to mock data
      let filteredProperties = [...mockProperties]
      
      if (filters.type) {
        filteredProperties = filteredProperties.filter(p => p.type === filters.type)
      }
      
      if (filters.location) {
        filteredProperties = filteredProperties.filter(p => 
          p.location.toLowerCase().includes(filters.location.toLowerCase())
        )
      }
      
      if (filters.propertyType) {
        filteredProperties = filteredProperties.filter(p => p.property_type === filters.propertyType)
      }
      
      if (filters.minPrice) {
        filteredProperties = filteredProperties.filter(p => p.price >= parseInt(filters.minPrice))
      }
      
      if (filters.maxPrice) {
        filteredProperties = filteredProperties.filter(p => p.price <= parseInt(filters.maxPrice))
      }
      
      if (filters.bedrooms) {
        filteredProperties = filteredProperties.filter(p => p.bedrooms >= parseInt(filters.bedrooms))
      }
      
      if (filters.bathrooms) {
        filteredProperties = filteredProperties.filter(p => p.bathrooms >= parseInt(filters.bathrooms))
      }
      
      setProperties(filteredProperties)
    } catch (error) {
      console.error('Error fetching properties:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleFilterChange = (e) => {
    const { name, value } = e.target
    setFilters(prev => ({ ...prev, [name]: value }))
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      maximumFractionDigits: 0
    }).format(price)
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
              Properties
            </h2>
          </div>
        </div>
        
        {/* Filters */}
        <div className="mt-4 bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Filter Properties</h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Property Type</label>
              <select
                name="type"
                value={filters.type}
                onChange={handleFilterChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              >
                <option value="">Any</option>
                <option value="sale">For Sale</option>
                <option value="rent">For Rent</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Location</label>
              <input
                type="text"
                name="location"
                value={filters.location}
                onChange={handleFilterChange}
                placeholder="Enter location"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Category</label>
              <select
                name="propertyType"
                value={filters.propertyType}
                onChange={handleFilterChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              >
                <option value="">Any</option>
                <option value="apartment">Apartment</option>
                <option value="house">House</option>
                <option value="land">Land</option>
                <option value="commercial">Commercial</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Price Range</label>
              <div className="mt-1 flex rounded-md">
                <input
                  type="text"
                  name="minPrice"
                  value={filters.minPrice}
                  onChange={handleFilterChange}
                  placeholder="Min"
                  className="block w-full min-w-0 flex-1 rounded-none rounded-l-md border-gray-300 focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                />
                <input
                  type="text"
                  name="maxPrice"
                  value={filters.maxPrice}
                  onChange={handleFilterChange}
                  placeholder="Max"
                  className="block w-full min-w-0 flex-1 rounded-none rounded-r-md border-gray-300 focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Bedrooms</label>
              <select
                name="bedrooms"
                value={filters.bedrooms}
                onChange={handleFilterChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              >
                <option value="">Any</option>
                <option value="1">1+</option>
                <option value="2">2+</option>
                <option value="3">3+</option>
                <option value="4">4+</option>
                <option value="5">5+</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Bathrooms</label>
              <select
                name="bathrooms"
                value={filters.bathrooms}
                onChange={handleFilterChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              >
                <option value="">Any</option>
                <option value="1">1+</option>
                <option value="2">2+</option>
                <option value="3">3+</option>
                <option value="4">4+</option>
                <option value="5">5+</option>
              </select>
            </div>
          </div>
        </div>
        
        {/* Property Listings */}
        <div className="mt-8">
          {loading ? (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
            </div>
          ) : properties.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-gray-900">No properties found</h3>
              <p className="mt-2 text-sm text-gray-500">Try adjusting your filters to find more properties.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {properties.map((property) => (
                <Link key={property.id} to={`/properties/${property.id}`} className="block">
                  <div className="card overflow-hidden rounded-lg h-full flex flex-col">
                    <div className="relative h-48">
                      <img
                        className="h-full w-full object-cover"
                        src={property.image_url}
                        alt={property.title}
                      />
                      <div className="absolute top-0 right-0 bg-primary-600 text-white px-3 py-1 m-2 rounded-md text-sm font-medium">
                        {property.type === 'sale' ? 'For Sale' : 'For Rent'}
                      </div>
                    </div>
                    <div className="p-6 flex-grow flex flex-col">
                      <h3 className="text-lg font-semibold text-gray-900">{property.title}</h3>
                      <p className="text-gray-500">{property.location}</p>
                      <p className="mt-2 text-xl font-bold text-primary-600">{formatPrice(property.price)}</p>
                      <div className="mt-4 flex justify-between text-sm text-gray-500">
                        {property.bedrooms > 0 && (
                          <div className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                            {property.bedrooms} Beds
                          </div>
                        )}
                        {property.bathrooms > 0 && (
                          <div className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            {property.bathrooms} Baths
                          </div>
                        )}
                        <div className="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
                          </svg>
                          {property.area} sqm
                        </div>
                      </div>
                      <div className="mt-auto pt-4">
                        <div className="w-full flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-primary-700 bg-primary-100 hover:bg-primary-200">
                          View Details
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}