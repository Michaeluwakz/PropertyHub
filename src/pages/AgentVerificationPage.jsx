import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabase'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import toast from 'react-hot-toast'

export default function AgentVerificationPage() {
  const { user, userProfile, updateProfile } = useAuth()
  const [loading, setLoading] = useState(false)
  const [verificationStatus, setVerificationStatus] = useState(userProfile?.is_verified ? 'verified' : 'pending')

  const formik = useFormik({
    initialValues: {
      company_name: userProfile?.company_name || '',
      license_number: userProfile?.license_number || '',
      years_experience: userProfile?.years_experience || '',
      specialization: userProfile?.specialization || '',
      id_document: null,
      license_document: null,
    },
    validationSchema: Yup.object({
      company_name: Yup.string().required('Company name is required'),
      license_number: Yup.string().required('License number is required'),
      years_experience: Yup.number()
        .required('Years of experience is required')
        .positive('Must be a positive number')
        .integer('Must be a whole number'),
      specialization: Yup.string().required('Specialization is required'),
      id_document: Yup.mixed().test(
        'fileRequired',
        'ID document is required',
        function (value) {
          // If already verified, don't require document
          if (verificationStatus === 'verified') return true
          return value !== null || userProfile?.id_document_url
        }
      ),
      license_document: Yup.mixed().test(
        'fileRequired',
        'License document is required',
        function (value) {
          // If already verified, don't require document
          if (verificationStatus === 'verified') return true
          return value !== null || userProfile?.license_document_url
        }
      ),
    }),
    onSubmit: async (values) => {
      setLoading(true)
      
      try {
        // In a real implementation, you would upload documents and update profile
        // For demonstration, we'll simulate success
        
        setTimeout(() => {
          setVerificationStatus('pending')
          toast.success('Verification request submitted successfully!')
          setLoading(false)
        }, 2000)
      } catch (error) {
        console.error('Error submitting verification:', error)
        toast.error('Failed to submit verification request')
        setLoading(false)
      }
    },
  })

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="md:flex md:items-center md:justify-between mb-6">
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
              Agent Verification
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Complete this form to get verified as a real estate agent on PropertyHub.
            </p>
          </div>
        </div>
        
        {verificationStatus === 'verified' ? (
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6 text-center">
              <svg
                className="mx-auto h-12 w-12 text-green-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="mt-2 text-lg font-medium text-gray-900">Verification Complete</h3>
              <p className="mt-1 text-sm text-gray-500">
                Your agent account has been verified. You can now list properties and access all agent features.
              </p>
              <div className="mt-6">
                <a
                  href="/add-property"
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  List a Property
                </a>
              </div>
            </div>
          </div>
        ) : verificationStatus === 'pending' ? (
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6 text-center">
              <svg
                className="mx-auto h-12 w-12 text-yellow-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="mt-2 text-lg font-medium text-gray-900">Verification Pending</h3>
              <p className="mt-1 text-sm text-gray-500">
                Your verification request has been submitted and is currently under review. This process typically takes 1-2 business days.
              </p>
              <div className="mt-6">
                <a
                  href="/profile"
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  Back to Profile
                </a>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <form onSubmit={formik.handleSubmit}>
              <div className="px-4 py-5 sm:p-6">
                <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label htmlFor="company_name" className="block text-sm font-medium text-gray-700">
                      Company Name
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="company_name"
                        id="company_name"
                        className={`shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                          formik.touched.company_name && formik.errors.company_name ? 'border-red-300' : ''
                        }`}
                        value={formik.values.company_name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.company_name && formik.errors.company_name && (
                        <p className="mt-1 text-sm text-red-600">{formik.errors.company_name}</p>
                      )}
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label htmlFor="license_number" className="block text-sm font-medium text-gray-700">
                      License Number
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="license_number"
                        id="license_number"
                        className={`shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                          formik.touched.license_number && formik.errors.license_number ? 'border-red-300' : ''
                        }`}
                        value={formik.values.license_number}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.license_number && formik.errors.license_number && (
                        <p className="mt-1 text-sm text-red-600">{formik.errors.license_number}</p>
                      )}
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label htmlFor="years_experience" className="block text-sm font-medium text-gray-700">
                      Years of Experience
                    </label>
                    <div className="mt-1">
                      <input
                        type="number"
                        name="years_experience"
                        id="years_experience"
                        className={`shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                          formik.touched.years_experience && formik.errors.years_experience ? 'border-red-300' : ''
                        }`}
                        value={formik.values.years_experience}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.years_experience && formik.errors.years_experience && (
                        <p className="mt-1 text-sm text-red-600">{formik.errors.years_experience}</p>
                      )}
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label htmlFor="specialization" className="block text-sm font-medium text-gray-700">
                      Specialization
                    </label>
                    <div className="mt-1">
                      <select
                        id="specialization"
                        name="specialization"
                        className={`shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                          formik.touched.specialization && formik.errors.specialization ? 'border-red-300' : ''
                        }`}
                        value={formik.values.specialization}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      >
                        <option value="">Select a specialization</option>
                        <option value="residential">Residential</option>
                        <option value="commercial">Commercial</option>
                        <option value="land">Land</option>
                        <option value="luxury">Luxury</option>
                        <option value="property-management">Property Management</option>
                      </select>
                      {formik.touched.specialization && formik.errors.specialization && (
                        <p className="mt-1 text-sm text-red-600">{formik.errors.specialization}</p>
                      )}
                    </div>
                  </div>

                  <div className="sm:col-span-6">
                    <label className="block text-sm font-medium text-gray-700">
                      ID Document (National ID, Driver's License, or Passport)
                    </label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                      <div className="space-y-1 text-center">
                        <svg
                          className="mx-auto h-12 w-12 text-gray-400"
                          stroke="currentColor"
                          fill="none"
                          viewBox="0 0 48 48"
                          aria-hidden="true"
                        >
                          <path
                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <div className="flex text-sm text-gray-600">
                          <label
                            htmlFor="id-document"
                            className="relative cursor-pointer bg-white rounded-md font-medium text-primary-600 hover:text-primary-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500"
                          >
                            <span>Upload a file</span>
                            <input
                              id="id-document"
                              name="id_document"
                              type="file"
                              className="sr-only"
                              onChange={(event) => {
                                formik.setFieldValue('id_document', event.currentTarget.files[0])
                              }}
                            />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">
                          PDF, PNG, JPG up to 10MB
                        </p>
                      </div>
                    </div>
                    {formik.touched.id_document && formik.errors.id_document && (
                      <p className="mt-1 text-sm text-red-600">{formik.errors.id_document}</p>
                    )}
                  </div>

                  <div className="sm:col-span-6">
                    <label className="block text-sm font-medium text-gray-700">
                      Real Estate License Document
                    </label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                      <div className="space-y-1 text-center">
                        <svg
                          className="mx-auto h-12 w-12 text-gray-400"
                          stroke="currentColor"
                          fill="none"
                          viewBox="0 0 48 48"
                          aria-hidden="true"
                        >
                          <path
                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <div className="flex text-sm text-gray-600">
                          <label
                            htmlFor="license-document"
                            className="relative cursor-pointer bg-white rounded-md font-medium text-primary-600 hover:text-primary-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500"
                          >
                            <span>Upload a file</span>
                            <input
                              id="license-document"
                              name="license_document"
                              type="file"
                              className="sr-only"
                              onChange={(event) => {
                                formik.setFieldValue('license_document', event.currentTarget.files[0])
                              }}
                            />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">
                          PDF, PNG, JPG up to 10MB
                        </p>
                      </div>
                    </div>
                    {formik.touched.license_document && formik.errors.license_document && (
                      <p className="mt-1 text-sm text-red-600">{formik.errors.license_document}</p>
                    )}
                  </div>
                </div>
              </div>
              <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Submitting...
                    </>
                  ) : (
                    'Submit for Verification'
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}