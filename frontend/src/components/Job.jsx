import { Bookmark, MapPin, Clock } from 'lucide-react'
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar'
import { useNavigate } from 'react-router-dom'

const Job = ({ job }) => {
    const navigate = useNavigate();

    const daysAgoFunction = (mongodbTime) => {
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDifference = currentTime - createdAt;
        return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
    }

    const daysAgo = daysAgoFunction(job?.createdAt);

    return (
        <div className="flex flex-col justify-between h-full bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer">

            {/* Top Row — Date & Bookmark */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-1.5 text-xs text-gray-400 font-medium">
                    <Clock size={12} />
                    {daysAgo === 0 ? 'Today' : `${daysAgo} days ago`}
                </div>
                <button className="w-8 h-8 flex items-center justify-center rounded-xl border border-gray-200 text-gray-400 hover:border-[#7209b7] hover:text-[#7209b7] hover:bg-violet-50 transition-all duration-150">
                    <Bookmark size={14} />
                </button>
            </div>

            {/* Company Info */}
            <div className="flex items-center gap-3 mb-4">
                <div className="w-11 h-11 rounded-xl border border-gray-100 bg-gray-50 flex items-center justify-center overflow-hidden flex-shrink-0">
                    <Avatar className="w-9 h-9">
                        <AvatarImage src={job?.company?.logo} className="object-contain" />
                        <AvatarFallback className="text-xs font-bold text-gray-500 bg-transparent">
                            {job?.company?.name?.[0]}
                        </AvatarFallback>
                    </Avatar>
                </div>
                <div className="min-w-0">
                    <h2 className="text-sm font-semibold text-gray-900 truncate">{job?.company?.name}</h2>
                    <div className="flex items-center gap-1 text-xs text-gray-400 mt-0.5">
                        <MapPin size={10} />
                        India
                    </div>
                </div>
            </div>

            {/* Job Title & Description */}
            <div className="mb-4 flex-1">
                <h1 className="font-bold text-gray-900 text-base leading-snug mb-1.5 line-clamp-1">{job?.title}</h1>
                <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">{job?.description}</p>
            </div>

            {/* Badges */}
            <div className="flex items-center gap-2 mb-5 flex-wrap">
                <span className="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-600 text-xs font-semibold whitespace-nowrap">
                    {job?.position} Positions
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-orange-50 text-[#F83002] text-xs font-semibold whitespace-nowrap">
                    {job?.jobType}
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-violet-50 text-[#7209b7] text-xs font-semibold whitespace-nowrap">
                    {job?.salary} LPA
                </span>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
                <button
                    onClick={() => navigate(`/description/${job?._id}`)}
                    className="flex-1 py-2.5 text-sm font-semibold text-gray-700 bg-white border border-gray-200 rounded-xl hover:border-gray-400 hover:bg-gray-50 transition-all duration-150"
                >
                    Details
                </button>
                <button className="flex-1 py-2.5 text-sm font-semibold text-white bg-[#7209b7] rounded-xl hover:bg-[#5f07a0] transition-all duration-150 shadow-sm shadow-violet-200">
                    Save For Later
                </button>
            </div>
        </div>
    )
}

export default Job