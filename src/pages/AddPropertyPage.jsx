import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabase'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import toast from 'react-hot-toast'

export default function AddPropertyPage() {
  const { user, userProfile } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [mainImagePreview, setMainImagePreview] = useState(null)
  const [additionalImagePreviews, setAdditionalImagePreviews] = useState([])

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      price: '',
      type: 'sale',
      property_type: 'apartment',
      bedrooms: '',
      bathrooms: '',
      area: '',
      location: '',
      address: '',
      features: [],
      mainImage: null,
      additionalImages: [],
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .required('Title is required')
        .max(100, 'Title must be 100 characters or less'),
      description: Yup.string()
        .required('Description is required')
        .min(50, 'Description must be at least 50 characters'),
      price: Yup.number()
        .required('Price is required')
        .positive('Price must be positive'),
      type: Yup.string()
        .required('Property listing type is required'),
      property_type: Yup.string()
        .required('Property type is required'),
      bedrooms: Yup.number()
        .when('property_type', {
          is: (val) => val !== 'land' && val !== 'commercial',
          then: Yup.number().required('Number of bedrooms is required').min(0, 'Cannot be negative'),
          otherwise: Yup.number().min(0, 'Cannot be negative'),
        }),
      bathrooms: Yup.number()
        .when('property_type', {
          is: (val) => val !== 'land',
          then: Yup.number().required('Number of bathrooms is required').min(0, 'Cannot be negative'),
          otherwise: Yup.number().min(0, 'Cannot be negative'),
        }),
      area: Yup.number()
        .required('Area is required')
        .positive('Area must be positive'),
      location: Yup.string()
        .required('Location is required'),
      address: Yup.string()
        .required('Address is required'),
      mainImage: Yup.mixed()
        .required('Main image is required'),
    }),
    onSubmit: async (values) => {
      setLoading(true)
      
      try {
        // In a real implementation, you would upload images and save property data
        // For demonstration, we'll simulate success
        
        // Simulate upload progress
        let progress = 0
        const interval = setInterval(() => {
          progress += 10
          setUploadProgress(progress)
          if (progress >= 100) {
            clearInterval(interval)
            
            // Show success message
            toast.success('Property listed successfully!')
            
            // Redirect to properties page
            navigate('/properties')
          }
        }, 300)
        
      } catch (error) {
        console.error('Error adding property:', error)
        toast.error('Failed to add property. Please try again.')
        setLoading(false)
      }
    },
  })

  const handleMainImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      formik.setFieldValue('mainImage', file)
      
      // Create preview
      const reader = new FileReader()
      reader.onload = () => {
        setMainImagePreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleAdditionalImagesChange = (e) => {
    const files = Array.from(e.target.files)
    if (files.length > 0) {
      formik.setFieldValue('additionalImages', [
        ...formik.values.additionalImages,
        ...files
      ])
      
      // Create previews
      const newPreviews = []
      files.forEach(file => {
        const reader = new FileReader()
        reader.onload = () => {
          newPreviews.push(reader.result)
          if (newPreviews.length === files.length) {
            setAdditionalImagePreviews([
              ...additionalImagePreviews,
              ...newPreviews
            ])
          }
        }
        reader.readAsDataURL(file)
      })
    }
  }

  const removeAdditionalImage = (index) => {
    const newImages = [...formik.values.additionalImages]
    newImages.splice(index, 1)
    formik.setFieldValue('additionalImages', newImages)
    
    const newPreviews = [...additionalImagePreviews]
    newPreviews.splice(index, 1)
    setAdditionalImagePreviews(newPreviews)
  }

  const handleFeatureToggle = (feature) => {
    const currentFeatures = [...formik.values.features]
    if (currentFeatures.includes(feature)) {
      formik.setFieldValue(
        'features',
        currentFeatures.filter(f => f !== feature)
      )
    } else {
      formik.setFieldValue('features', [...currentFeatures, feature])
    }
  }

  const commonFeatures = [
    '24/7 Security',
    'Swimming Pool',
    'Gym',
    'Parking Space',
    'Air Conditioning',
    'Fully Furnished',
    'Balcony',
    'Garden',
    'CCTV',
    'Elevator',
    'Constant Power Supply',
    'Water Supply',
    'Fully Fitted Kitchen',
    'Wifi',
    'Cable TV',
  ]

  return (
    <div className="bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="md:flex md:items-center md:justify-between mb-6">
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
              List Your Property
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Fill in the details below to list your property on PropertyHub.
            </p>
          </div>
        </div>
        
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <form onSubmit={formik.handleSubmit}>
            <div className="px-4 py-5 sm:p-6">
              <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                {/* Basic Information */}
                <div className="sm:col-span-6">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">Basic Information</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Provide the basic details about your property.
                  </p>
                </div>
                
                <div className="sm:col-span-6">
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                    Property Title
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="title"
                      id="title"
                      className={`shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                        formik.touched.title && formik.errors.title ? 'border-red-300' : ''
                      }`}
                      value={formik.values.title}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.title && formik.errors.title && (
                      <p className="mt-1 text-sm text-red-600">{formik.errors.title}</p>
                    )}
                  </div>
                  <p className="mt-2 text-sm text-gray-500">
                    A clear, descriptive title will attract more potential buyers/tenants.
                  </p>
                </div>
                
                <div className="sm:col-span-6">
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <div className="mt-1">
                    <textarea
                      id="description"
                      name="description"
                      rows={4}
                      className={`shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                        formik.touched.description && formik.errors.description ? 'border-red-300' : ''
                      }`}
                      value={formik.values.description}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.description && formik.errors.description && (
                      <p className="mt-1 text-sm text-red-600">{formik.errors.description}</p>
                    )}
                  </div>
                  <p className="mt-2 text-sm text-gray-500">
                    Provide a detailed description of your property, highlighting its best features.
                  </p>
                </div>
                
                <div className="sm:col-span-3">
                  <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                    Listing Type
                  </label>
                  <div className="mt-1">
                    <select
                      id="type"
                      name="type"
                      className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      value={formik.values.type}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    >
                      <option value="sale">For Sale</option>
                      <option value="rent">For Rent</option>
                    </select>
                  </div>
                </div>
                
                <div className="sm:col-span-3">
                  <label htmlFor="property_type" className="block text-sm font-medium text-gray-700">
                    Property Type
                  </label>
                  <div className="mt-1">
                    <select
                      id="property_type"
                      name="property_type"
                      className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      value={formik.values.property_type}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    >
                      <option value="apartment">Apartment</option>
                      <option value="house">House</option>
                      <option value="land">Land</option>
                      <option value="commercial">Commercial</option>
                    </select>
                  </div>
                </div>
                
                <div className="sm:col-span-2">
                  <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                    Price (₦)
                  </label>
                  <div className="mt-1">
                    <input
                      type="number"
                      name="price"
                      id="price"
                      className={`shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                        formik.touched.price && formik.errors.price ? 'border-red-300' : ''
                      }`}
                      value={formik.values.price}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.price && formik.errors.price && (
                      <p className="mt-1 text-sm text-red-600">{formik.errors.price}</p>
                    )}
                  </div>
                </div>
                
                <div className="sm:col-span-2">
                  <label htmlFor="area" className="block text-sm font-medium text-gray-700">
                    Area (sqm)
                  </label>
                  <div className="mt-1">
                    <input
                      type="number"
                      name="area"
                      id="area"
                      className={`shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                        formik.touched.area && formik.errors.area ? 'border-red-300' : ''
                      }`}
                      value={formik.values.area}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.area && formik.errors.area && (
                      <p className="mt-1 text-sm text-red-600">{formik.errors.area}</p>
                    )}
                  </div>
                </div>
                
                {formik.values.property_type !== 'land' && formik.values.property_type !== 'commercial' && (
                  <div className="sm:col-span-1">
                    <label htmlFor="bedrooms" className="block text-sm font-medium text-gray-700">
                      Bedrooms
                    </label>
                    <div className="mt-1">
                      <input
                        type="number"
                        name="bedrooms"
                        id="bedrooms"
                        className={`shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                          formik.touched.bedrooms && formik.errors.bedrooms ? 'border-red-300' : ''
                        }`}
                        value={formik.values.bedrooms}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.bedrooms && formik.errors.bedrooms && (
                        <p className="mt-1 text-sm text-red-600">{formik.errors.bedrooms}</p>
                      )}
                    </div>
                  </div>
                )}
                
                {formik.values.property_type !== 'land' && (
                  <div className="sm:col-span-1">
                    <label htmlFor="bathrooms" className="block text-sm font-medium text-gray-700">
                      Bathrooms
                    </label>
                    <div className="mt-1">
                      <input
                        type="number"
                        name="bathrooms"
                        id="bathrooms"
                        className={`shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                          formik.touched.bathrooms && formik.errors.bathrooms ? 'border-red-300' : ''
                        }`}
                        value={formik.values.bathrooms}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.bathrooms && formik.errors.bathrooms && (
                        <p className="mt-1 text-sm text-red-600">{formik.errors.bathrooms}</p>
                      )}
                    </div>
                  </div>
                )}
                
                {/* Location */}
                <div className="sm:col-span-6 pt-6">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">Location</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Provide the location details of your property.
                  </p>
                </div>
                
                <div className="sm:col-span-3">
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                    City/Area
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="location"
                      id="location"
                      className={`shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                        formik.touched.location && formik.errors.location ? 'border-red-300' : ''
                      }`}
                      value={formik.values.location}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.location && formik.errors.location && (
                      <p className="mt-1 text-sm text-red-600">{formik.errors.location}</p>
                    )}
                  </div>
                </div>
                
                <div className="sm:col-span-3">
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                    Full Address
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="address"
                      id="address"
                      className={`shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                        formik.touched.address && formik.errors.address ? 'border-red-300' : ''
                      }`}
                      value={formik.values.address}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.address && formik.errors.address && (
                      <p className="mt-1 text-sm text-red-600">{formik.errors.address}</p>
                    )}
                  </div>
                </div>
                
                {/* Features */}
                <div className="sm:col-span-6 pt-6">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">Features</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Select the features that your property offers.
                  </p>
                </div>
                
                <div className="sm:col-span-6">
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {commonFeatures.map((feature) => (
                      <div key={feature} className="relative flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id={`feature-${feature}`}
                            name={`feature-${feature}`}
                            type="checkbox"
                            className="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300 rounded"
                            checked={formik.values.features.includes(feature)}
                            onChange={() => handleFeatureToggle(feature)}
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor={`feature-${feature}`} className="font-medium text-gray-700">
                            {feature}
                          </label>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Images */}
                <div className="sm:col-span-6 pt-6">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">Images</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Upload images of your property. The first image will be used as the main image.
                  </p>
                </div>
                
                <div className="sm:col-span-6">
                  <label className="block text-sm font-medium text-gray-700">Main Image</label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                    {mainImagePreview ? (
                      <div className="space-y-1 text-center">
                        <img
                          src={mainImagePreview}
                          alt="Main property"
                          className="mx-auto h-64 w-full object-cover rounded-md"
                        />
                        <div className="flex text-sm text-gray-600">
                          <label
                            htmlFor="main-image-upload"
                            className="relative cursor-pointer bg-white rounded-md font-medium text-primary-600 hover:text-primary-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500"
                          >
                            <span>Change image</span>
                            <input
                              id="main-image-upload"
                              name="main-image-upload"
                              type="file"
                              className="sr-only"
                              accept="image/*"
                              onChange={handleMainImageChange}
                            />
                          </label>
                        </div>
                      </div>
                    ) : (
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
                            htmlFor="main-image-upload"
                            className="relative cursor-pointer bg-white rounded-md font-medium text-primary-600 hover:text-primary-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500"
                          >
                            <span>Upload a file</span>
                            <input
                              id="main-image-upload"
                              name="main-image-upload"
                              type="file"
                              className="sr-only"
                              accept="image/*"
                              onChange={handleMainImageChange}
                            />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                      </div>
                    )}
                  </div>
                  {formik.touched.mainImage && formik.errors.mainImage && (
                    <p className="mt-1 text-sm text-red-600">{formik.errors.mainImage}</p>
                  )}
                </div>
                
                <div className="sm:col-span-6">
                  <label className="block text-sm font-medium text-gray-700">Additional Images</label>
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
                          htmlFor="additional-images-upload"
                          className="relative cursor-pointer bg-white rounded-md font-medium text-primary-600 hover:text-primary-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500"
                        >
                          <span>Upload files</span>
                          <input
                            id="additional-images-upload"
                            name="additional-images-upload"
                            type="file"
                            className="sr-only"
                            accept="image/*"
                            multiple
                            onChange={handleAdditionalImagesChange}
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                    </div>
                  </div>
                </div>
                
                {additionalImagePreviews.length > 0 && (
                  <div className="sm:col-span-6">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Additional Images Preview</h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                      {additionalImagePreviews.map((preview, index) => (
                        <div key={index} className="relative">
                          <img
                            src={preview}
                            alt={`Property ${index + 1}`}
                            className="h-40 w-full object-cover rounded-md"
                          />
                          <button
                            type="button"
                            className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                            onClick={() => removeAdditionalImage(index)}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
              {loading ? (
                <div className="w-full">
                  <div className="mb-2 flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">Uploading...</span>
                    <span className="text-sm font-medium text-gray-700">{uploadProgress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-primary-600 h-2.5 rounded-full" style={{ width: `${uploadProgress}%` }}></div>
                  </div>
                </div>
              ) : (
                <button
                  type="submit"
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  List Property
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}