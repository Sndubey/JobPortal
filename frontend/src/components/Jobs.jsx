import { useEffect, useState } from 'react'
import Navbar from './shared/Navbar'
import FilterCard from './FilterCard'
import Job from './Job';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { SlidersHorizontal, X, Briefcase } from 'lucide-react';

const Jobs = () => {
    const { allJobs, searchedQuery } = useSelector(store => store.job);
    const [filterJobs, setFilterJobs] = useState(allJobs);
    const [showMobileFilter, setShowMobileFilter] = useState(false);

    useEffect(() => {
        if (searchedQuery) {
            const filteredJobs = allJobs.filter((job) => {
                return job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    job.location.toLowerCase().includes(searchedQuery.toLowerCase())
            });
            setFilterJobs(filteredJobs);
        } else {
            setFilterJobs(allJobs);
        }
    }, [allJobs, searchedQuery]);

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <div className="max-w-7xl mx-auto px-6 py-8">

                {/* Page Header */}
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">
                            {searchedQuery ? `Results for "${searchedQuery}"` : 'All Jobs'}
                        </h1>
                        <p className="text-sm text-gray-400 mt-0.5">
                            {filterJobs.length} {filterJobs.length === 1 ? 'job' : 'jobs'} found
                        </p>
                    </div>

                    {/* Mobile filter toggle */}
                    <button
                        onClick={() => setShowMobileFilter(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:border-gray-300 shadow-sm transition-all duration-150 md:hidden"
                    >
                        <SlidersHorizontal size={15} />
                        Filters
                    </button>
                </div>

                <div className="flex gap-6 items-start">

                    {/* Sidebar Filter — Desktop */}
                    <aside className="hidden md:block w-72 flex-shrink-0 sticky top-24">
                        <FilterCard />
                    </aside>

                    {/* Mobile Filter Drawer */}
                    <AnimatePresence>
                        {showMobileFilter && (
                            <>
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    onClick={() => setShowMobileFilter(false)}
                                    className="fixed inset-0 bg-black/40 z-40 md:hidden"
                                />
                                <motion.div
                                    initial={{ x: '-100%' }}
                                    animate={{ x: 0 }}
                                    exit={{ x: '-100%' }}
                                    transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                                    className="fixed top-0 left-0 h-full w-80 bg-white z-50 shadow-2xl md:hidden overflow-y-auto"
                                >
                                    <div className="flex items-center justify-between p-4 border-b border-gray-100">
                                        <span className="font-bold text-gray-900">Filters</span>
                                        <button
                                            onClick={() => setShowMobileFilter(false)}
                                            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-500 transition-colors"
                                        >
                                            <X size={16} />
                                        </button>
                                    </div>
                                    <div className="p-4">
                                        <FilterCard />
                                    </div>
                                </motion.div>
                            </>
                        )}
                    </AnimatePresence>

                    {/* Jobs Grid */}
                    <div className="flex-1 min-w-0">
                        {filterJobs.length === 0 ? (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex flex-col items-center justify-center py-24 text-center"
                            >
                                <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mb-4">
                                    <Briefcase size={28} className="text-gray-300" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-700">No jobs found</h3>
                                <p className="text-sm text-gray-400 mt-1 max-w-xs">
                                    Try adjusting your search or filters to find what you're looking for.
                                </p>
                            </motion.div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                                <AnimatePresence>
                                    {filterJobs.map((job, index) => (
                                        <motion.div
                                            key={job?._id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            transition={{ duration: 0.2, delay: index * 0.04 }}
                                        >
                                            <Job job={job} />
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Jobs;