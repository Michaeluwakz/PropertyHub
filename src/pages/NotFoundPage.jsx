import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-white px-4 sm:px-6 lg:px-8">
      <div className="max-w-max mx-auto text-center">
        <main>
          <div>
            <p className="text-sm font-semibold text-primary-600 uppercase tracking-wide">404 error</p>
            <h1 className="mt-2 text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">Page not found</h1>
            <p className="mt-2 text-base text-gray-500">Sorry, we couldn't find the page you're looking for.</p>
            <div className="mt-6">
              <Link to="/" className="text-base font-medium text-primary-600 hover:text-primary-500">
                Go back home<span aria-hidden="true"> &rarr;</span>
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}