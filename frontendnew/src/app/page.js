import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <nav className="w-full py-4 bg-white shadow-md">
        <div className="max-w-6xl mx-auto flex justify-between items-center px-6">
          <div className="text-2xl font-bold text-gray-800">Country API</div>
          <div className="flex gap-6">
            <Link href="/" className="text-gray-700 hover:text-blue-500">Home</Link>
            <Link href="/login" className="text-gray-700 hover:text-blue-500">Login</Link>
            <Link href="/register" className="text-gray-700 hover:text-blue-500">Register</Link>
          </div>
        </div>
      </nav>

      <main className="flex-1 flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-4xl font-bold mt-6 text-gray-800">
          Welcome to Country Details Getting App
        </h1>
        {/* Buttons */}
        <div className="flex gap-4 mt-6">
          <Link href="/login">
            <button className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition">
              Login
            </button>
          </Link>
          <Link href="/register">
            <button className="bg-gray-200 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-300 transition">
              Register
            </button>
          </Link>
        </div>
      </main>

      <footer className="w-full py-4 text-center text-gray-600 bg-white shadow-md">
        © 2025 lasith@20210568. All Rights Reserved.
      </footer>
    </div>
  );
}
