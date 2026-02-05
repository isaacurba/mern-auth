import { Link } from "react-router-dom"

const NavBar = () => {
  return (
    <nav className='w-full py-4 px-4 sm:px-6 lg:px-16 bg-card/50 backdrop-blur-sm sticky top-0 z-50'>
        <div className='w-full lg:max-w-5xl mx-auto flex items-center justify-between border-b border-gray-200 p-2'>
            <Link to="/" className="font-bold text-xl">Products</Link>

            <Link to="/create">
                <button className="bg-blue-500 text-white rounded-sm px-2 py-2">
                    + Create Product
                </button>
            </Link>
        </div>
    </nav>
  )
}

export default NavBar;
