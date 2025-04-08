export default function Landing() {
    return (
      <div className="min-h-screen bg-gradient-to-r from-blue-400 to-indigo-600 text-white flex items-center justify-center">
        <div className="text-center space-y-6">
          <h1 className="text-5xl font-bold">Welcome to CountryAPI Fetcher</h1>
          <p className="text-xl">Get your API key and start using country data instantly</p>
          <div className="space-x-4">
            <a href="/login" className="px-6 py-2 bg-white text-indigo-600 font-semibold rounded-lg shadow-md hover:bg-gray-100 transition">Login</a>
            <a href="/register" className="px-6 py-2 border border-white font-semibold rounded-lg hover:bg-white hover:text-indigo-600 transition">Register</a>
          </div>
        </div>
      </div>
    );
  }
  