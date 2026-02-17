import { useState } from 'react'
import { Search, Sparkles, TrendingUp, Users, Briefcase } from 'lucide-react'
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const popularSearches = ["Frontend Developer", "Backend Developer", "UI/UX Designer", "Data Analyst", "DevOps"];

const stats = [
    { icon: Briefcase, value: "50K+", label: "Jobs Posted" },
    { icon: Users, value: "30K+", label: "Companies" },
    { icon: TrendingUp, value: "95%", label: "Success Rate" },
];

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const [focused, setFocused] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = () => {
        if (!query.trim()) return;
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') searchJobHandler();
    };

    const handlePopularSearch = (term) => {
        dispatch(setSearchedQuery(term));
        navigate("/browse");
    };

    return (
        <section className="relative overflow-hidden bg-white">
            {/* Background blobs */}
            <div className="absolute -top-32 -left-32 w-96 h-96 bg-violet-100 rounded-full blur-3xl opacity-40 pointer-events-none" />
            <div className="absolute -top-20 -right-32 w-80 h-80 bg-orange-100 rounded-full blur-3xl opacity-50 pointer-events-none" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

            <div className="relative max-w-7xl mx-auto px-6 pt-20 pb-16 flex flex-col items-center text-center">

                {/* Badge */}
                <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-50 border border-orange-100 text-[#F83002] text-sm font-semibold mb-8">
                    <Sparkles size={14} className="text-[#F83002]" />
                    No. 1 Job Hunt Website
                </div>

                {/* Headline */}
                <h1 className="text-6xl font-extrabold tracking-tight text-gray-900 leading-tight max-w-3xl">
                    Search, Apply &{" "}
                    <br />
                    Get Your{" "}
                    <span className="relative inline-block">
                        <span className="text-[#6A38C2]">Dream Jobs</span>
                        <span className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-[#6A38C2] to-violet-400 rounded-full opacity-40" />
                    </span>
                </h1>

                {/* Subtext */}
                <p className="mt-5 text-gray-400 text-lg max-w-xl leading-relaxed">
                    Thousands of jobs from top companies. Find the right fit, apply in seconds, and land your next big role.
                </p>

                {/* Search Bar */}
                <div className={`mt-10 flex items-center w-full max-w-2xl bg-white border-2 rounded-2xl px-4 py-2 shadow-lg transition-all duration-200 gap-3
                    ${focused ? 'border-[#6A38C2] shadow-violet-100' : 'border-gray-200 shadow-gray-100'}`}
                >
                    <Search size={20} className={`flex-shrink-0 transition-colors duration-150 ${focused ? 'text-[#6A38C2]' : 'text-gray-400'}`} />
                    <input
                        type="text"
                        value={query}
                        placeholder="Job title, keywords, or company..."
                        onChange={(e) => setQuery(e.target.value)}
                        onFocus={() => setFocused(true)}
                        onBlur={() => setFocused(false)}
                        onKeyDown={handleKeyDown}
                        className="flex-1 outline-none border-none text-gray-800 text-base placeholder-gray-400 bg-transparent py-1"
                    />
                    <button
                        onClick={searchJobHandler}
                        className="flex-shrink-0 flex items-center gap-2 px-6 py-2.5 bg-[#6A38C2] hover:bg-[#5b30a6] text-white text-sm font-semibold rounded-xl transition-all duration-150 hover:-translate-y-px shadow-md shadow-violet-200"
                    >
                        <Search size={15} />
                        Search
                    </button>
                </div>

                {/* Popular Searches */}
                <div className="mt-5 flex items-center gap-2 flex-wrap justify-center">
                    <span className="text-xs text-gray-400 font-medium">Popular:</span>
                    {popularSearches.map((term) => (
                        <button
                            key={term}
                            onClick={() => handlePopularSearch(term)}
                            className="text-xs px-3 py-1.5 rounded-lg bg-gray-100 text-gray-600 hover:bg-violet-100 hover:text-[#6A38C2] font-medium transition-all duration-150"
                        >
                            {term}
                        </button>
                    ))}
                </div>

                {/* Stats */}
                <div className="mt-16 flex items-center gap-10 flex-wrap justify-center">
                    {stats.map(({ icon: Icon, value, label }, i) => (
                        <div key={label} className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-violet-50 flex items-center justify-center text-[#6A38C2]">
                                <Icon size={18} />
                            </div>
                            <div className="text-left">
                                <p className="text-lg font-extrabold text-gray-900 leading-none">{value}</p>
                                <p className="text-xs text-gray-400 mt-0.5">{label}</p>
                            </div>
                            {i < stats.length - 1 && (
                                <div className="ml-10 w-px h-8 bg-gray-200 hidden sm:block" />
                            )}
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default HeroSection;