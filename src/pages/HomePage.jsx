import { Link } from 'react-router-dom'
import { useState } from 'react'

export default function HomePage() {
  const [searchParams, setSearchParams] = useState({
    type: 'buy',
    location: '',
    propertyType: '',
    minPrice: '',
    maxPrice: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setSearchParams(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Construct query string and redirect to properties page
    const queryParams = new URLSearchParams()
    for (const [key, value] of Object.entries(searchParams)) {
      if (value) queryParams.append(key, value)
    }
    window.location.href = `/properties?${queryParams.toString()}`
  }

  const featuredProperties = [
    {
      id: 1,
      title: 'Luxury 3 Bedroom Apartment',
      location: 'Lekki Phase 1, Lagos',
      price: '₦75,000,000',
      type: 'For Sale',
      bedrooms: 3,
      bathrooms: 3,
      area: '180 sqm',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 2,
      title: 'Modern 2 Bedroom Flat',
      location: 'Ikeja GRA, Lagos',
      price: '₦45,000,000',
      type: 'For Sale',
      bedrooms: 2,
      bathrooms: 2,
      area: '120 sqm',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 3,
      title: 'Spacious 4 Bedroom Duplex',
      location: 'Banana Island, Lagos',
      price: '₦250,000,000',
      type: 'For Sale',
      bedrooms: 4,
      bathrooms: 5,
      area: '350 sqm',
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
  ]

  return (
    <div>
      {/* Hero Section */}
      <div className="relative bg-gray-900">
        <div className="absolute inset-0">
          <img
            className="h-full w-full object-cover"
            src="https://images.unsplash.com/photo-1582407947304-fd86f028f716?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
            alt="Nigerian real estate"
          />
          <div className="absolute inset-0 bg-black opacity-60"></div>
        </div>
        <div className="relative mx-auto max-w-7xl py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Find Your Perfect Property in Nigeria
          </h1>
          <p className="mt-6 max-w-3xl text-xl text-gray-300">
            Browse thousands of properties for sale and rent across Nigeria. From luxury apartments to affordable homes, find your ideal property with PropertyHub.
          </p>
        </div>
      </div>

      {/* Search Section */}
      <div className="bg-white shadow-md -mt-10 relative z-10 mx-auto max-w-5xl rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
              <div>
                <label className="block text-sm font-medium text-gray-700">I want to</label>
                <select
                  name="type"
                  value={searchParams.type}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                >
                  <option value="buy">Buy</option>
                  <option value="rent">Rent</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Location</label>
                <select
                  name="location"
                  value={searchParams.location}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                >
                  <option value="">Any Location</option>
                  <option value="lagos">Lagos</option>
                  <option value="abuja">Abuja</option>
                  <option value="port-harcourt">Port Harcourt</option>
                  <option value="ibadan">Ibadan</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Property Type</label>
                <select
                  name="propertyType"
                  value={searchParams.propertyType}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                >
                  <option value="">Any Type</option>
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
                    value={searchParams.minPrice}
                    onChange={handleChange}
                    placeholder="Min"
                    className="block w-full min-w-0 flex-1 rounded-none rounded-l-md border-gray-300 focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                  />
                  <input
                    type="text"
                    name="maxPrice"
                    value={searchParams.maxPrice}
                    onChange={handleChange}
                    placeholder="Max"
                    className="block w-full min-w-0 flex-1 rounded-none rounded-r-md border-gray-300 focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                  />
                </div>
              </div>
              
              <div className="flex items-end">
                <button
                  type="submit"
                  className="inline-flex w-full justify-center rounded-md border border-transparent bg-primary-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                >
                  Search
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Featured Properties */}
      <div className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Featured Properties</h2>
            <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
              Discover our handpicked selection of premium properties across Nigeria
            </p>
          </div>
          
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {featuredProperties.map((property) => (
              <div key={property.id} className="card overflow-hidden rounded-lg">
                <div className="relative h-48">
                  <img
                    className="h-full w-full object-cover"
                    src={property.image}
                    alt={property.title}
                  />
                  <div className="absolute top-0 right-0 bg-primary-600 text-white px-3 py-1 m-2 rounded-md text-sm font-medium">
                    {property.type}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900">{property.title}</h3>
                  <p className="text-gray-500">{property.location}</p>
                  <p className="mt-2 text-xl font-bold text-primary-600">{property.price}</p>
                  <div className="mt-4 flex justify-between text-sm text-gray-500">
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                      {property.bedrooms} Beds
                    </div>
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {property.bathrooms} Baths
                    </div>
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
                      </svg>
                      {property.area}
                    </div>
                  </div>
                  <div className="mt-6">
                    <Link
                      to={`/properties/${property.id}`}
                      className="w-full flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-primary-700 bg-primary-100 hover:bg-primary-200"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Link
              to="/properties"
              className="inline-flex items-center rounded-md border border-transparent bg-primary-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            >
              View All Properties
            </Link>
          </div>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Why Choose PropertyHub</h2>
            <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
              We're committed to helping you find the perfect property in Nigeria
            </p>
          </div>
          
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-md bg-primary-100 text-primary-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">Extensive Property Listings</h3>
              <p className="mt-2 text-base text-gray-500">
                Access thousands of verified property listings across Nigeria, updated daily with new opportunities.
              </p>
            </div>
            
            <div className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-md bg-primary-100 text-primary-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">Verified Agents</h3>
              <p className="mt-2 text-base text-gray-500">
                All our agents are verified professionals, ensuring you get reliable service and legitimate properties.
              </p>
            </div>
            
            <div className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-md bg-primary-100 text-primary-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">Fast & Easy Process</h3>
              <p className="mt-2 text-base text-gray-500">
                Our streamlined platform makes it easy to find, inquire about, and secure your ideal property.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary-700">
        <div className="mx-auto max-w-7xl py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            <span className="block">Ready to find your dream property?</span>
            <span className="block text-primary-200">Join thousands of satisfied customers today.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <Link
                to="/properties"
                className="inline-flex items-center justify-center rounded-md border border-transparent bg-white px-5 py-3 text-base font-medium text-primary-600 hover:bg-primary-50"
              >
                Browse Properties
              </Link>
            </div>
            <div className="ml-3 inline-flex rounded-md shadow">
              <Link
                to="/register"
                className="inline-flex items-center justify-center rounded-md border border-transparent bg-primary-100 px-5 py-3 text-base font-medium text-primary-700 hover:bg-primary-200"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}