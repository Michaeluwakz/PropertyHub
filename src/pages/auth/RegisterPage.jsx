import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { useFormik } from 'formik'
import * as Yup from 'yup'

export default function RegisterPage() {
  const { signUp } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      password: '',
      confirmPassword: '',
      userType: 'buyer', // Default user type
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .required('First name is required'),
      lastName: Yup.string()
        .required('Last name is required'),
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
      phoneNumber: Yup.string()
        .required('Phone number is required'),
      password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .required('Password is required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm password is required'),
      userType: Yup.string()
        .required('User type is required'),
    }),
    onSubmit: async (values) => {
      setLoading(true)
      setError('')
      
      try {
        const { data, error } = await signUp(
          values.email, 
          values.password, 
          {
            firstName: values.firstName,
            lastName: values.lastName,
            phoneNumber: values.phoneNumber,
            userType: values.userType,
          }
        )
        
        if (error) throw error
        
        // Redirect to login page after successful registration
        navigate('/login')
      } catch (error) {
        setError(error.message || 'Failed to create account')
      } finally {
        setLoading(false)
      }
    },
  })

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Create your account</h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <Link to="/login" className="font-medium text-primary-600 hover:text-primary-500">
              sign in to your existing account
            </Link>
          </p>
        </div>
        
        {error && (
          <div className="rounded-md bg-red-50 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">{error}</h3>
              </div>
            </div>
          </div>
        )}
        
        <form className="mt-8 space-y-6" onSubmit={formik.handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First name</label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  autoComplete="given-name"
                  required
                  className={`mt-1 block w-full border ${
                    formik.touched.firstName && formik.errors.firstName ? 'border-red-300' : 'border-gray-300'
                  } rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm`}
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.firstName && formik.errors.firstName && (
                  <p className="mt-1 text-sm text-red-600">{formik.errors.firstName}</p>
                )}
              </div>

              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last name</label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  autoComplete="family-name"
                  required
                  className={`mt-1 block w-full border ${
                    formik.touched.lastName && formik.errors.lastName ? 'border-red-300' : 'border-gray-300'
                  } rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm`}
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.lastName && formik.errors.lastName && (
                  <p className="mt-1 text-sm text-red-600">{formik.errors.lastName}</p>
                )}
              </div>
            </div>

            <div className="mt-6">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className={`mt-1 block w-full border ${
                  formik.touched.email && formik.errors.email ? 'border-red-300' : 'border-gray-300'
                } rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm`}
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.email && formik.errors.email && (
                <p className="mt-1 text-sm text-red-600">{formik.errors.email}</p>
              )}
            </div>

            <div className="mt-6">
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Phone number</label>
              <input
                id="phoneNumber"
                name="phoneNumber"
                type="tel"
                autoComplete="tel"
                required
                className={`mt-1 block w-full border ${
                  formik.touched.phoneNumber && formik.errors.phoneNumber ? 'border-red-300' : 'border-gray-300'
                } rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm`}
                value={formik.values.phoneNumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                <p className="mt-1 text-sm text-red-600">{formik.errors.phoneNumber}</p>
              )}
            </div>

            <div className="mt-6">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className={`mt-1 block w-full border ${
                  formik.touched.password && formik.errors.password ? 'border-red-300' : 'border-gray-300'
                } rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm`}
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.password && formik.errors.password && (
                <p className="mt-1 text-sm text-red-600">{formik.errors.password}</p>
              )}
            </div>

            <div className="mt-6">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm password</label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                className={`mt-1 block w-full border ${
                  formik.touched.confirmPassword && formik.errors.confirmPassword ? 'border-red-300' : 'border-gray-300'
                } rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm`}
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-600">{formik.errors.confirmPassword}</p>
              )}
            </div>

            <div className="mt-6">
              <label htmlFor="userType" className="block text-sm font-medium text-gray-700">I am a</label>
              <select
                id="userType"
                name="userType"
                required
                className={`mt-1 block w-full border ${
                  formik.touched.userType && formik.errors.userType ? 'border-red-300' : 'border-gray-300'
                } rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm`}
                value={formik.values.userType}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <option value="buyer">Buyer/Tenant</option>
                <option value="agent">Agent/Landlord</option>
              </select>
              {formik.touched.userType && formik.errors.userType && (
                <p className="mt-1 text-sm text-red-600">{formik.errors.userType}</p>
              )}
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              {loading ? (
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <svg className="h-5 w-5 text-primary-500 group-hover:text-primary-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                </span>
              )}
              Create Account
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}