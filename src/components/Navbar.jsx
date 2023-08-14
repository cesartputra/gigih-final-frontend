import { Link } from "react-router-dom";
import { useAuth } from './AuthContext';

export default function Navbar(){
    const { user, logout } = useAuth();

    const handleLogout = () => {
        logout();
        // Redirect or perform other actions after logout
    };
    
    return (
        <div className="navbar bg-base-100">
            <div className="flex-1">
                {/* <Link className="btn btn-ghost normal-case text-xl" href={<Home />}>Tokopedia Play</Link> */}
                <Link to="/" className="btn btn-ghost normal-case text-xl">
                    Tokopedia Play
                </Link>
            </div>
            <div className="flex-auto">
                <div className="form-control">
                    <input type="text" placeholder="Search" className="input input-bordered w-96" />
                </div>
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
                                
                                className="btn btn-ghost"
                                >
                                    Profile
                                </button>
                            </li>
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