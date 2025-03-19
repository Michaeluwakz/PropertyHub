import { useState, useEffect } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { supabase } from '../../lib/supabase'
import toast from 'react-hot-toast'

export default function AdminDashboardPage() {
  const { user, userProfile } = useAuth()
  const [activeTab, setActiveTab] = useState('properties')
  const [properties, setProperties] = useState([])
  const [users, setUsers] = useState([])
  const [verificationRequests, setVerificationRequests] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (userProfile?.user_type === 'admin') {
      fetchData(activeTab)
    }
  }, [activeTab, userProfile])

  const fetchData = async (tab) => {
    setLoading(true)
    
    try {
      // In a real implementation, you would fetch from Supabase based on the active tab
      // For demonstration, we'll use mock data
      
      if (tab === 'properties') {
        const mockProperties = [
          {
            id: 1,
            title: 'Luxury 3 Bedroom Apartment',
            location: 'Lekki Phase 1, Lagos',
            price: 75000000,
            type: 'sale',
            status: 'active',
            created_at: '2023-11-15T10:30:00Z',
            user: {
              first_name: 'John',
              last_name: 'Doe',
              email: 'john.doe@example.com'
            }
          },
          {
            id: 2,
            title: 'Modern 2 Bedroom Flat',
            location: 'Ikeja GRA, Lagos',
            price: 45000000,
            type: 'sale',
            status: 'pending',
            created_at: '2023-11-14T14:20:00Z',
            user: {
              first_name: 'Jane',
              last_name: 'Smith',
              email: 'jane.smith@example.com'
            }
          },
          {
            id: 3,
            title: 'Spacious 4 Bedroom Duplex',
            location: 'Banana Island, Lagos',
            price: 250000000,
            type: 'sale',
            status: 'active',
            created_at: '2023-11-13T09:15:00Z',
            user: {
              first_name: 'Michael',
              last_name: 'Johnson',
              email: 'michael.johnson@example.com'
            }
          },
        ]
        setProperties(mockProperties)
      } else if (tab === 'users') {
        const mockUsers = [
          {
            id: 1,
            first_name: 'John',
            last_name: 'Doe',
            email: 'john.doe@example.com',
            user_type: 'agent',
            is_verified: true,
            created_at: '2023-10-15T10:30:00Z'
          },
          {
            id: 2,
            first_name: 'Jane',
            last_name: 'Smith',
            email: 'jane.smith@example.com',
            user_type: 'buyer',
            is_verified: false,
            created_at: '2023-10-20T14:20:00Z'
          },
          {
            id: 3,
            first_name: 'Michael',
            last_name: 'Johnson',
            email: 'michael.johnson@example.com',
            user_type: 'agent',
            is_verified: true,
            created_at: '2023-10-25T09:15:00Z'
          },
        ]
        setUsers(mockUsers)
      } else if (tab === 'verifications') {
        const mockVerifications = [
          {
            id: 1,
            user: {
              id: 4,
              first_name: 'Sarah',
              last_name: 'Williams',
              email: 'sarah.williams@example.com'
            },
            company_name: 'Williams Real Estate',
            license_number: 'RE12345',
            years_experience: 5,
            specialization: 'residential',
            status: 'pending',
            created_at: '2023-11-10T10:30:00Z'
          },
          {
            id: 2,
            user: {
              id: 5,
              first_name: 'Robert',
              last_name: 'Brown',
              email: 'robert.brown@example.com'
            },
            company_name: 'Brown Properties',
            license_number: 'RE67890',
            years_experience: 3,
            specialization: 'commercial',
            status: 'pending',
            created_at: '2023-11-12T14:20:00Z'
          },
        ]
        setVerificationRequests(mockVerifications)
      }
    } catch (error) {
      console.error(`Error fetching ${tab}:`, error)
      toast.error(`Failed to load ${tab}`)
    } finally {
      setLoading(false)
    }
  }

  const handlePropertyAction = async (id, action) => {
    try {
      // In a real implementation, you would update the property status in Supabase
      // For demonstration, we'll update the local state
      
      if (action === 'approve') {
        setProperties(properties.map(p => p.id === id ? { ...p, status: 'active' } : p))
        toast.success('Property approved successfully')
      } else if (action === 'reject') {
        setProperties(properties.map(p => p.id === id ? { ...p, status: 'rejected' } : p))
        toast.success('Property rejected')
      } else if (action === 'delete') {
        setProperties(properties.filter(p => p.id !== id))
        toast.success('Property deleted')
      }
    } catch (error) {
      console.error('Error updating property:', error)
      toast.error('Failed to update property')
    }
  }

  const handleVerificationAction = async (id, action) => {
    try {
      // In a real implementation, you would update the verification status in Supabase
      // For demonstration, we'll update the local state
      
      if (action === 'approve') {
        setVerificationRequests(verificationRequests.filter(v => v.id !== id))
        toast.success('Agent verified successfully')
      } else if (action === 'reject') {
        setVerificationRequests(verificationRequests.filter(v => v.id !== id))
        toast.success('Verification request rejected')
      }
    } catch (error) {
      console.error('Error updating verification:', error)
      toast.error('Failed to update verification')
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

  if (userProfile?.user_type !== 'admin') {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-max mx-auto text-center">
          <svg
            className="mx-auto h-12 w-12 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <h3 className="mt-2 text-lg font-medium text-gray-900">Access Denied</h3>
          <p className="mt-1 text-sm text-gray-500">
            You do not have permission to access this page.
          </p>
          <div className="mt-6">
            <a
              href="/"
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Go back home
            </a>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="md:flex md:items-center md:justify-between mb-6">
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
              Admin Dashboard
            </h2>
          </div>
        </div>
        
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex" aria-label="Tabs">
              <button
                onClick={() => setActiveTab('properties')}
                className={`${
                  activeTab === 'properties'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } w-1/3 py-4 px-1 text-center border-b-2 font-medium text-sm`}
              >
                Properties
              </button>
              <button
                onClick={() => setActiveTab('users')}
                className={`${
                  activeTab === 'users'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } w-1/3 py-4 px-1 text-center border-b-2 font-medium text-sm`}
              >
                Users
              </button>
              <button
                onClick={() => setActiveTab('verifications')}
                className={`${
                  activeTab === 'verifications'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } w-1/3 py-4 px-1 text-center border-b-2 font-medium text-sm`}
              >
                Verification Requests
              </button>
            </nav>
          </div>
          
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
            </div>
          ) : (
            <div>
              {/* Properties Tab */}
              {activeTab === 'properties' && (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Property
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Price
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Owner
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date Listed
                        </th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {properties.map((property) => (
                        <tr key={property.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{property.title}</div>
                            <div className="text-sm text-gray-500">{property.location}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{formatPrice(property.price)}</div>
                            <div className="text-sm text-gray-500">{property.type === 'sale' ? 'For Sale' : 'For Rent'}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{property.user.first_name} {property.user.last_name}</div>
                            <div className="text-sm text-gray-500">{property.user.email}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              property.status === 'active' 
                                ? 'bg-green-100 text-green-800' 
                                : property.status === 'pending' 
                                ? 'bg-yellow-100 text-yellow-800' 
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {formatDate(property.created_at)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <a href={`/properties/${property.id}`} className="text-primary-600 hover:text-primary-900 mr-3">
                              View
                            </a>
                            {property.status === 'pending' && (
                              <>
                                <button 
                                  onClick={() => handlePropertyAction(property.id, 'approve')}
                                  className="text-green-600 hover:text-green-900 mr-3"
                                >
                                  Approve
                                </button>
                                <button 
                                  onClick={() => handlePropertyAction(property.id, 'reject')}
                                  className="text-red-600 hover:text-red-900"
                                >
                                  Reject
                                </button>
                              </>
                            )}
                            {property.status !== 'pending' && (
                              <button 
                                onClick={() => handlePropertyAction(property.id, 'delete')}
                                className="text-red-600 hover:text-red-900"
                              >
                                Delete
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              
              {/* Users Tab */}
              {activeTab === 'users' && (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Name
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Email
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Type
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Joined
                        </th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {users.map((user) => (
                        <tr key={user.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{user.first_name} {user.last_name}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{user.email}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{user.user_type.charAt(0).toUpperCase() + user.user_type.slice(1)}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {user.user_type === 'agent' ? (
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                user.is_verified ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                              }`}>
                                {user.is_verified ? 'Verified' : 'Unverified'}
                              </span>
                            ) : (
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                                N/A
                              </span>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {formatDate(user.created_at)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button className="text-primary-600 hover:text-primary-900 mr-3">
                              View
                            </button>
                            <button className="text-red-600 hover:text-red-900">
                              Suspend
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              
              {/* Verification Requests Tab */}
              {activeTab === 'verifications' && (
                <div>
                  {verificationRequests.length === 0 ? (
                    <div className="text-center py-12">
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
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <h3 className="mt-2 text-lg font-medium text-gray-900">No pending verification requests</h3>
                      <p className="mt-1 text-sm text-gray-500">
                        All agent verification requests have been processed.
                      </p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Agent
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Company
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              License
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Experience
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Date Submitted
                            </th>
                            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {verificationRequests.map((request) => (
                            <tr key={request.id}>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-medium text-gray-900">{request.user.first_name} {request.user.last_name}</div>
                                <div className="text-sm text-gray-500">{request.user.email}</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">{request.company_name}</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">{request.license_number}</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">{request.years_experience} years</div>
                                <div className="text-sm text-gray-500">{request.specialization.charAt(0).toUpperCase() + request.specialization.slice(1)}</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {formatDate(request.created_at)}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <button 
                                  onClick={() => handleVerificationAction(request.id, 'approve')}
                                  className="text-green-600 hover:text-green-900 mr-3"
                                >
                                  Approve
                                </button>
                                <button 
                                  onClick={() => handleVerificationAction(request.id, 'reject')}
                                  className="text-red-600 hover:text-red-900"
                                >
                                  Reject
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}