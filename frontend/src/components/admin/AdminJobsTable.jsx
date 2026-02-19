import { useEffect, useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, Eye, MoreHorizontal, LayoutDashboard, Calendar, Building2 } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const AdminJobsTable = () => {
    const { allAdminJobs, searchJobByText } = useSelector(store => store.job);
    const [filterJobs, setFilterJobs] = useState(allAdminJobs);
    const navigate = useNavigate();

    useEffect(() => {
        const filteredJobs = allAdminJobs.filter((job) => {
            if (!searchJobByText) return true;
            return job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) ||
                job?.company?.name?.toLowerCase().includes(searchJobByText.toLowerCase());
        });
        setFilterJobs(filteredJobs);
    }, [allAdminJobs, searchJobByText]);

    if (filterJobs?.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="w-14 h-14 rounded-2xl bg-gray-100 flex items-center justify-center mb-3">
                    <LayoutDashboard size={24} className="text-gray-300" />
                </div>
                <p className="text-sm font-semibold text-gray-500">No jobs found</p>
                <p className="text-xs text-gray-400 mt-1">Try adjusting your search or post a new job.</p>
            </div>
        );
    }

    return (
        <div className="overflow-x-auto">
            <table className="w-full text-sm">
                {/* Head */}
                <thead>
                    <tr className="border-b border-gray-100 bg-gray-50/60">
                        <th className="text-left text-xs font-bold uppercase tracking-wider text-gray-400 px-6 py-4">Company</th>
                        <th className="text-left text-xs font-bold uppercase tracking-wider text-gray-400 px-6 py-4">Role</th>
                        <th className="text-left text-xs font-bold uppercase tracking-wider text-gray-400 px-6 py-4">Posted On</th>
                        <th className="text-right text-xs font-bold uppercase tracking-wider text-gray-400 px-6 py-4">Actions</th>
                    </tr>
                </thead>

                {/* Body */}
                <tbody className="divide-y divide-gray-50">
                    {filterJobs?.map((job) => (
                        <tr key={job._id} className="hover:bg-gray-50/70 transition-colors duration-100 group">

                            {/* Company */}
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-2.5">
                                    <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                                        {job?.company?.logo ? (
                                            <img
                                                src={job.company.logo}
                                                alt={job.company.name}
                                                className="w-6 h-6 object-contain"
                                            />
                                        ) : (
                                            <Building2 size={14} className="text-gray-400" />
                                        )}
                                    </div>
                                    <span className="font-semibold text-gray-700">{job?.company?.name}</span>
                                </div>
                            </td>

                            {/* Role */}
                            <td className="px-6 py-4">
                                <span className="font-medium text-gray-900">{job?.title}</span>
                            </td>

                            {/* Date */}
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-1.5 text-gray-500">
                                    <Calendar size={13} className="text-gray-400" />
                                    {job?.createdAt.split("T")[0]}
                                </div>
                            </td>

                            {/* Actions */}
                            <td className="px-6 py-4 text-right">
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <button className="w-8 h-8 rounded-lg border border-transparent hover:border-gray-200 hover:bg-gray-100 flex items-center justify-center ml-auto text-gray-400 hover:text-gray-700 transition-all duration-150">
                                            <MoreHorizontal size={16} />
                                        </button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-44 p-1.5 rounded-xl shadow-lg border border-gray-100" align="end">
                                        <button
                                            onClick={() => navigate(`/admin/jobs/${job._id}`)}
                                            className="flex items-center gap-2.5 w-full px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-violet-50 hover:text-[#7209b7] transition-colors duration-150"
                                        >
                                            <div className="w-6 h-6 rounded-md bg-violet-100 flex items-center justify-center flex-shrink-0">
                                                <Edit2 size={11} className="text-[#7209b7]" />
                                            </div>
                                            Edit Job
                                        </button>
                                        <button
                                            onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)}
                                            className="flex items-center gap-2.5 w-full px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-150 mt-0.5"
                                        >
                                            <div className="w-6 h-6 rounded-md bg-blue-100 flex items-center justify-center flex-shrink-0">
                                                <Eye size={11} className="text-blue-600" />
                                            </div>
                                            View Applicants
                                        </button>
                                    </PopoverContent>
                                </Popover>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Footer */}
            <div className="px-6 py-3 border-t border-gray-100 bg-gray-50/50">
                <p className="text-xs text-gray-400">
                    Showing <span className="font-semibold text-gray-600">{filterJobs?.length}</span> {filterJobs?.length === 1 ? 'job' : 'jobs'}
                </p>
            </div>
        </div>
    );
};

export default AdminJobsTable;