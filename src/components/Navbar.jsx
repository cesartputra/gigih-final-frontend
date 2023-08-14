import { Link, useNavigate } from "react-router-dom";
import { useAuth } from './AuthContext';
import { useState } from "react";


export default function Navbar(){
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');

    const handleLogout = () => {
        logout();
    };

    const handleSearch = (e) => {
        if (e.key === 'Enter') {
            navigate(`/search?q=${searchQuery}`)
        }
    };
    
    return (
        <div className="navbar bg-base-100">
            <div className="flex-1">
                <Link to="/" className="btn btn-ghost normal-case text-xl">
                    Tokopedia Play
                </Link>
            </div>
            <div className="flex-auto">
                <input
                    type="text"
                    placeholder="Search"
                    className="input input-bordered w-96"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={handleSearch}
                />
            </div>
            <div className="flex-none gap-2">
                {user ? (
                    <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img src={user.avatar} />
                            </div>
                        </label>
                        <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                            <li>
                                <button
                                onClick={handleLogout}
                                className="btn btn-ghost"
                                >
                                    Logout
                                </button>
                            </li>
                        </ul>
                    </div>
                ) : (
                    <>
                        <Link to="/login" className="btn btn-ghost">
                            Log In
                        </Link>
                        <Link to="/register" className="btn btn-neutral">
                            Sign Up
                        </Link>
                    </>
                    
                )}
            </div>
        </div>
    );
}