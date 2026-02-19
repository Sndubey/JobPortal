import { useState } from 'react'
import Navbar from '../shared/Navbar'
import { useSelector } from 'react-redux'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import axios from 'axios'
import { JOB_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import {
    Loader2, ChevronLeft, Briefcase, FileText, ListChecks,
    BadgeDollarSign, MapPin, Clock, GraduationCap, Users, Building2, AlertCircle
} from 'lucide-react'

const fields = [
    { name: 'title', label: 'Job Title', icon: Briefcase, type: 'text', placeholder: 'e.g. Senior Frontend Developer' },
    { name: 'description', label: 'Description', icon: FileText, type: 'text', placeholder: 'Brief overview of the role' },
    { name: 'requirements', label: 'Requirements', icon: ListChecks, type: 'text', placeholder: 'e.g. React, Node.js, 3+ years exp' },
    { name: 'salary', label: 'Salary (LPA)', icon: BadgeDollarSign, type: 'text', placeholder: 'e.g. 12' },
    { name: 'location', label: 'Location', icon: MapPin, type: 'text', placeholder: 'e.g. Bangalore, Remote' },
    { name: 'jobType', label: 'Job Type', icon: Clock, type: 'text', placeholder: 'e.g. Full Time, Part Time' },
    { name: 'experience', label: 'Experience Level', icon: GraduationCap, type: 'text', placeholder: 'e.g. 2-4 years' },
    { name: 'position', label: 'No. of Positions', icon: Users, type: 'number', placeholder: 'e.g. 3' },
];

const PostJob = () => {
    const [input, setInput] = useState({
        title: "", description: "", requirements: "", salary: "",
        location: "", jobType: "", experience: "", position: 0, companyId: ""
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { companies } = useSelector(store => store.company);

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const selectChangeHandler = (value) => {
        const selectedCompany = companies.find(c => c.name.toLowerCase() === value);
        setInput({ ...input, companyId: selectedCompany._id });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const token = localStorage.getItem("token");
            const res = await axios.post(`${JOB_API_END_POINT}/post`, input, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            });
            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/admin/jobs");
            }
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <div className="max-w-3xl mx-auto px-6 py-10">

                {/* Back Button */}
                <button
                    onClick={() => navigate('/admin/jobs')}
                    className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-700 font-medium mb-8 transition-colors duration-150"
                >
                    <ChevronLeft size={16} />
                    Back to Jobs
                </button>

                {/* Page Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-2.5 mb-1">
                        <div className="w-8 h-8 rounded-lg bg-violet-100 flex items-center justify-center">
                            <Briefcase size={16} className="text-[#7209b7]" />
                        </div>
                        <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">Post a New Job</h1>
                    </div>
                    <p className="text-sm text-gray-400 ml-10">Fill in the details below to publish a new listing</p>
                </div>

                {/* No company warning */}
                {companies.length === 0 && (
                    <div className="flex items-start gap-3 px-4 py-3.5 bg-red-50 border border-red-100 rounded-xl mb-6">
                        <AlertCircle size={16} className="text-red-400 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-red-500 font-medium">
                            Please register a company first before posting a job.
                        </p>
                    </div>
                )}

                {/* Form Card */}
                <form onSubmit={submitHandler} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">

                    <div className="p-6 border-b border-gray-100">
                        <h2 className="text-sm font-bold text-gray-600">Job Information</h2>
                    </div>

                    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
                        {fields.map(({ name, label, icon: Icon, type, placeholder }) => (
                            <div key={name} className={name === 'description' || name === 'requirements' ? 'sm:col-span-2' : ''}>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                                    {label}
                                </label>
                                <div className="relative">
                                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                                        <Icon size={15} />
                                    </div>
                                    <input
                                        type={type}
                                        name={name}
                                        value={input[name]}
                                        onChange={changeEventHandler}
                                        placeholder={placeholder}
                                        className="w-full pl-9 pr-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#7209b7] focus:ring-2 focus:ring-violet-100 focus:bg-white transition-all duration-150 placeholder-gray-400 text-gray-800"
                                    />
                                </div>
                            </div>
                        ))}

                        {/* Company Select */}
                        {companies.length > 0 && (
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                                    Company
                                </label>
                                <div className="relative">
                                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none z-10">
                                        <Building2 size={15} />
                                    </div>
                                    <Select onValueChange={selectChangeHandler}>
                                        <SelectTrigger className="w-full pl-9 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:border-[#7209b7] focus:ring-2 focus:ring-violet-100 transition-all duration-150 h-auto">
                                            <SelectValue placeholder="Select a company" />
                                        </SelectTrigger>
                                        <SelectContent className="rounded-xl border border-gray-100 shadow-lg">
                                            <SelectGroup>
                                                {companies.map((company) => (
                                                    <SelectItem
                                                        key={company._id}
                                                        value={company.name.toLowerCase()}
                                                        className="rounded-lg text-sm"
                                                    >
                                                        {company.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Submit */}
                    <div className="px-6 pb-6">
                        <button
                            type="submit"
                            disabled={loading || companies.length === 0}
                            className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all duration-150
                                ${loading || companies.length === 0
                                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                    : 'bg-[#7209b7] hover:bg-[#5f07a0] text-white shadow-sm shadow-violet-200 hover:-translate-y-px'
                                }`}
                        >
                            {loading ? (
                                <>
                                    <Loader2 size={15} className="animate-spin" />
                                    Posting...
                                </>
                            ) : (
                                <>
                                    <Briefcase size={15} />
                                    Post New Job
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PostJob;