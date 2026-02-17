import { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'
import { MapPin, Layers, DollarSign, X, SlidersHorizontal } from 'lucide-react'

const filterData = [
    {
        filterType: "Location",
        icon: MapPin,
        array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"]
    },
    {
        filterType: "Industry",
        icon: Layers,
        array: ["Frontend Developer", "Backend Developer", "FullStack Developer"]
    },
    {
        filterType: "Salary",
        icon: DollarSign,
        array: ["0-40k", "42k-1 Lakh", "1 Lakh to 5 Lakh"]
    },
]

const FilterCard = () => {
    const [selectedValue, setSelectedValue] = useState('');
    const dispatch = useDispatch();

    const changeHandler = (value) => {
        setSelectedValue(value);
    }

    const clearFilter = () => {
        setSelectedValue('');
    }

    useEffect(() => {
        dispatch(setSearchedQuery(selectedValue));
    }, [selectedValue]);

    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">

            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-violet-50 flex items-center justify-center">
                        <SlidersHorizontal size={14} className="text-[#6A38C2]" />
                    </div>
                    <span className="font-bold text-gray-900 text-sm">Filter Jobs</span>
                </div>
                {selectedValue && (
                    <button
                        onClick={clearFilter}
                        className="flex items-center gap-1 text-xs font-medium text-red-400 hover:text-red-500 bg-red-50 hover:bg-red-100 px-2.5 py-1 rounded-lg transition-all duration-150"
                    >
                        <X size={11} />
                        Clear
                    </button>
                )}
            </div>

            {/* Active Filter Pill */}
            {selectedValue && (
                <div className="px-5 pt-3">
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-violet-50 border border-violet-100 rounded-xl w-fit">
                        <span className="text-xs font-semibold text-[#6A38C2]">{selectedValue}</span>
                        <button onClick={clearFilter} className="text-violet-300 hover:text-violet-500 transition-colors">
                            <X size={11} />
                        </button>
                    </div>
                </div>
            )}

            {/* Filter Sections */}
            <div className="px-5 py-4 space-y-5">
                <RadioGroup value={selectedValue} onValueChange={changeHandler}>
                    {filterData.map((data, index) => {
                        const Icon = data.icon;
                        return (
                            <div key={index}>
                                {/* Section Title */}
                                <div className="flex items-center gap-2 mb-3">
                                    <div className="w-6 h-6 rounded-md bg-gray-100 flex items-center justify-center">
                                        <Icon size={12} className="text-gray-500" />
                                    </div>
                                    <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
                                        {data.filterType}
                                    </span>
                                </div>

                                {/* Options */}
                                <div className="space-y-1 ml-1">
                                    {data.array.map((item, idx) => {
                                        const itemId = `id${index}-${idx}`;
                                        const isSelected = selectedValue === item;
                                        return (
                                            <div
                                                key={itemId}
                                                onClick={() => changeHandler(item)}
                                                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-all duration-150
                                                    ${isSelected
                                                        ? 'bg-violet-50 border border-violet-100'
                                                        : 'hover:bg-gray-50 border border-transparent'
                                                    }`}
                                            >
                                                <RadioGroupItem
                                                    value={item}
                                                    id={itemId}
                                                    className={isSelected ? 'text-[#6A38C2] border-[#6A38C2]' : ''}
                                                />
                                                <Label
                                                    htmlFor={itemId}
                                                    className={`text-sm cursor-pointer transition-colors duration-150 ${isSelected
                                                        ? 'text-[#6A38C2] font-semibold'
                                                        : 'text-gray-600 font-medium'
                                                        }`}
                                                >
                                                    {item}
                                                </Label>
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* Divider */}
                                {index < filterData.length - 1 && (
                                    <div className="mt-4 h-px bg-gray-100" />
                                )}
                            </div>
                        );
                    })}
                </RadioGroup>
            </div>
        </div>
    );
};

export default FilterCard;