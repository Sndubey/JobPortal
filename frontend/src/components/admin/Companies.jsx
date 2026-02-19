import { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import CompaniesTable from './CompaniesTable'
import { useNavigate } from 'react-router-dom'
import useGetAllCompanies from '@/hooks/useGetAllCompanies'
import { useDispatch } from 'react-redux'
import { setSearchCompanyByText } from '@/redux/companySlice'
import { Search, Plus, Building2 } from 'lucide-react'

const Companies = () => {
    useGetAllCompanies();
    const [input, setInput] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setSearchCompanyByText(input));
    }, [input]);

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <div className="max-w-6xl mx-auto px-6 py-10">

                {/* Page Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-2.5 mb-1">
                        <div className="w-8 h-8 rounded-lg bg-violet-100 flex items-center justify-center">
                            <Building2 size={16} className="text-[#7209b7]" />
                        </div>
                        <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">Companies</h1>
                    </div>
                    <p className="text-sm text-gray-400 ml-10">Manage and view all your registered companies</p>
                </div>

                {/* Toolbar */}
                <div className="flex items-center justify-between gap-4 mb-6">
                    <div className="relative">
                        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                        <input
                            type="text"
                            placeholder="Search by company name..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            className="pl-9 pr-4 py-2.5 text-sm bg-white border border-gray-200 rounded-xl outline-none focus:border-[#7209b7] focus:ring-2 focus:ring-violet-100 transition-all duration-150 w-72 placeholder-gray-400"
                        />
                    </div>

                    <button
                        onClick={() => navigate("/admin/companies/create")}
                        className="flex items-center gap-2 px-5 py-2.5 bg-[#7209b7] hover:bg-[#5f07a0] text-white text-sm font-semibold rounded-xl transition-all duration-150 shadow-sm shadow-violet-200 hover:-translate-y-px"
                    >
                        <Plus size={15} />
                        New Company
                    </button>
                </div>

                {/* Table Card */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                    <CompaniesTable />
                </div>

            </div>
        </div>
    );
};

export default Companies;