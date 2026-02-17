import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant';
import { setSingleJob } from '@/redux/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import Navbar from './shared/Navbar';
import {
    MapPin, Briefcase, BadgeDollarSign, Users, Calendar,
    Clock, ChevronLeft, CheckCircle2, Building2
} from 'lucide-react';

const JobDescription = () => {
    const { singleJob } = useSelector(store => store.job);
    const { user } = useSelector(store => store.auth);
    const isInitiallyApplied = singleJob?.applications?.some(app => app.applicant === user?._id) || false;
    const [isApplied, setIsApplied] = useState(isInitiallyApplied);

    const params = useParams();
    const jobId = params.id;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const applyJobHandler = async () => {
        try {
            const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, { withCredentials: true });
            if (res.data.success) {
                setIsApplied(true);
                const updatedSingleJob = {
                    ...singleJob,
                    applications: [...singleJob.applications, { applicant: user?._id }]
                };
                dispatch(setSingleJob(updatedSingleJob));
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    };

    useEffect(() => {
        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setSingleJob(res.data.job));
                    setIsApplied(res.data.job.applications.some(app => app.applicant === user?._id));
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchSingleJob();
    }, [jobId, dispatch, user?._id]);

    const details = [
        { icon: Briefcase,        label: 'Role',              value: singleJob?.title },
        { icon: MapPin,           label: 'Location',          value: singleJob?.location },
        { icon: Clock,            label: 'Experience',        value: `${singleJob?.experience} yrs` },
        { icon: BadgeDollarSign,  label: 'Salary',            value: `${singleJob?.salary} LPA` },
        { icon: Users,            label: 'Total Applicants',  value: singleJob?.applications?.length },
        { icon: Calendar,         label: 'Posted Date',       value: singleJob?.createdAt?.split("T")[0] },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <div className="max-w-4xl mx-auto px-6 py-10">

                {/* Back Button */}
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-700 font-medium mb-8 transition-colors duration-150"
                >
                    <ChevronLeft size={16} />
                    Back to Jobs
                </button>

                {/* Header Card */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-5">
                    <div className="flex items-start justify-between gap-4">
                        <div className="flex items-center gap-4">
                            {/* Company Logo */}
                            <div className="w-14 h-14 rounded-xl border border-gray-100 bg-gray-50 flex items-center justify-center flex-shrink-0">
                                {singleJob?.company?.logo ? (
                                    <img
                                        src={singleJob.company.logo}
                                        alt={singleJob.company.name}
                                        className="w-10 h-10 object-contain"
                                    />
                                ) : (
                                    <Building2 size={22} className="text-gray-300" />
                                )}
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-gray-400">{singleJob?.company?.name}</p>
                                <h1 className="text-xl font-extrabold text-gray-900 tracking-tight mt-0.5">
                                    {singleJob?.title}
                                </h1>
                                {/* Badges */}
                                <div className="flex items-center gap-2 mt-2 flex-wrap">
                                    <span className="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-600 text-xs font-semibold">
                                        {singleJob?.postion} Positions
                                    </span>
                                    <span className="px-2.5 py-1 rounded-lg bg-orange-50 text-[#F83002] text-xs font-semibold">
                                        {singleJob?.jobType}
                                    </span>
                                    <span className="px-2.5 py-1 rounded-lg bg-violet-50 text-[#7209b7] text-xs font-semibold">
                                        {singleJob?.salary} LPA
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Apply Button */}
                        <button
                            onClick={isApplied ? null : applyJobHandler}
                            disabled={isApplied}
                            className={`flex-shrink-0 flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150 shadow-sm
                                ${isApplied
                                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                    : 'bg-[#7209b7] hover:bg-[#5f07a0] text-white shadow-violet-200 hover:-translate-y-px'
                                }`}
                        >
                            {isApplied ? (
                                <>
                                    <CheckCircle2 size={15} />
                                    Applied
                                </>
                            ) : (
                                'Apply Now'
                            )}
                        </button>
                    </div>
                </div>

                {/* Description Card */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-5">
                    <h2 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-4">About the Role</h2>
                    <p className="text-gray-600 text-sm leading-relaxed">{singleJob?.description}</p>
                </div>

                {/* Details Grid */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                    <h2 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-4">Job Details</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {details.map(({ icon: Icon, label, value }) => (
                            <div key={label} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50">
                                <div className="w-9 h-9 rounded-lg bg-white border border-gray-100 shadow-sm flex items-center justify-center flex-shrink-0">
                                    <Icon size={15} className="text-[#7209b7]" />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400 font-medium">{label}</p>
                                    <p className="text-sm font-semibold text-gray-800 mt-0.5">{value}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default JobDescription;