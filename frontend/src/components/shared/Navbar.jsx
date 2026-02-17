import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { LogOut, User2, Briefcase, ChevronDown, Building2, LayoutDashboard } from 'lucide-react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'

const Navbar = () => {
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setUser(null));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }

    const isActive = (path) => location.pathname === path;

    const getInitials = (name) => {
        if (!name) return 'U';
        return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    }

    return (
        <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100 shadow-sm">
            <div className="flex items-center justify-between max-w-7xl mx-auto px-6 h-16">

                {/* Logo */}
                <Link to="/" className="flex items-center">
                    <span className="text-2xl font-extrabold tracking-tight text-gray-900">Job</span>
                    <span className="text-2xl font-extrabold tracking-tight text-[#F83002]">Portal</span>
                    <span className="ml-0.5 mb-3 w-1.5 h-1.5 rounded-full bg-[#F83002] inline-block" />
                </Link>

                {/* Nav Links */}
                <ul className="flex items-center gap-1 list-none m-0 p-0">
                    {user && user.role === 'recruiter' ? (
                        <>
                            <li>
                                <Link
                                    to="/admin/companies"
                                    className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150
                                        ${isActive('/admin/companies')
                                            ? 'bg-gray-100 text-gray-900 font-semibold'
                                            : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                                        }`}
                                >
                                    <Building2 size={15} />
                                    Companies
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/admin/jobs"
                                    className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150
                                        ${isActive('/admin/jobs')
                                            ? 'bg-gray-100 text-gray-900 font-semibold'
                                            : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                                        }`}
                                >
                                    <LayoutDashboard size={15} />
                                    Jobs
                                </Link>
                            </li>
                        </>
                    ) : (
                        <>
                            {[
                                { to: '/', label: 'Home' },
                                { to: '/jobs', label: 'Jobs' },
                                { to: '/browse', label: 'Browse' },
                            ].map(({ to, label }) => (
                                <li key={to}>
                                    <Link
                                        to={to}
                                        className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150
                                            ${isActive(to)
                                                ? 'text-gray-900 font-semibold'
                                                : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                                            }`}
                                    >
                                        {label}
                                        {isActive(to) && (
                                            <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-[#F83002] rounded-full" />
                                        )}
                                    </Link>
                                </li>
                            ))}
                        </>
                    )}
                </ul>

                {/* Right Side */}
                <div className="flex items-center gap-3">
                    {!user ? (
                        <>
                            <Link
                                to="/login"
                                className="px-5 py-2 text-sm font-medium text-gray-700 border border-gray-200 rounded-xl hover:border-gray-400 hover:bg-gray-50 transition-all duration-150"
                            >
                                Login
                            </Link>
                            <Link
                                to="/signup"
                                className="flex items-center gap-2 px-5 py-2 text-sm font-semibold text-white bg-gray-900 rounded-xl hover:bg-gray-700 transition-all duration-150 shadow-sm hover:-translate-y-px"
                            >
                                <Briefcase size={14} />
                                Get Started
                            </Link>
                        </>
                    ) : (
                        <Popover>
                            <PopoverTrigger asChild>
                                <button className="flex items-center gap-2 pl-1 pr-3 py-1 border border-gray-200 rounded-full hover:border-gray-300 hover:shadow-md transition-all duration-200 bg-white cursor-pointer">
                                    {user?.profile?.profilePhoto ? (
                                        <img
                                            src={user.profile.profilePhoto}
                                            alt={user.fullname}
                                            className="w-8 h-8 rounded-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#F83002] to-orange-400 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                                            {getInitials(user?.fullname)}
                                        </div>
                                    )}
                                    <span className="text-sm font-semibold text-gray-800 max-w-[80px] truncate">
                                        {user?.fullname?.split(' ')[0]}
                                    </span>
                                    <ChevronDown size={14} className="text-gray-400" />
                                </button>
                            </PopoverTrigger>

                            <PopoverContent className="p-0 w-64 rounded-2xl border border-gray-100 shadow-xl overflow-hidden" align="end">
                                {/* Header */}
                                <div className="flex items-center gap-3 px-4 py-4 bg-gray-50 border-b border-gray-100">
                                    {user?.profile?.profilePhoto ? (
                                        <img
                                            src={user.profile.profilePhoto}
                                            alt={user.fullname}
                                            className="w-11 h-11 rounded-full object-cover flex-shrink-0"
                                        />
                                    ) : (
                                        <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#F83002] to-orange-400 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                                            {getInitials(user?.fullname)}
                                        </div>
                                    )}
                                    <div className="min-w-0">
                                        <p className="text-sm font-semibold text-gray-900 truncate">{user?.fullname}</p>
                                        <p className="text-xs text-gray-400 truncate">{user?.profile?.bio || 'No bio yet'}</p>
                                        {user?.role === 'recruiter' && (
                                            <span className="inline-block mt-1 text-[10px] font-bold uppercase tracking-wider bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full">
                                                Recruiter
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="p-2">
                                    {user?.role === 'student' && (
                                        <Link
                                            to="/profile"
                                            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-150"
                                        >
                                            <div className="w-8 h-8 rounded-lg bg-violet-100 flex items-center justify-center text-violet-600 flex-shrink-0">
                                                <User2 size={15} />
                                            </div>
                                            View Profile
                                        </Link>
                                    )}

                                    <div className="my-1.5 h-px bg-gray-100" />

                                    <button
                                        onClick={logoutHandler}
                                        className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-colors duration-150"
                                    >
                                        <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center text-red-500 flex-shrink-0">
                                            <LogOut size={15} />
                                        </div>
                                        Sign Out
                                    </button>
                                </div>
                            </PopoverContent>
                        </Popover>
                    )}
                </div>

            </div>
        </nav>
    )
}

export default Navbar