import { Company } from "../models/company.model.js";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";
import mongoose from 'mongoose';

export const registerCompany = async (req, res) => {
    try {
        const { companyName } = req.body;
        if (!companyName) {
            return res.status(400).json({
                message: "Company name is required.",
                success: false
            });
        }
        let company = await Company.findOne({ name: companyName });
        if (company) {
            return res.status(400).json({
                message: "You can't register same company.",
                success: false
            })
        };
        company = await Company.create({
            name: companyName,
            userId: req.id
        });

        return res.status(201).json({
            message: "Company registered successfully.",
            company,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

// get company by id
export const getCompany = async (req, res) => {
    try {
        console.log("getCompany called - userId:", req.id);
        const userId = req.id;

        // Find all companies and filter
        const companies = await Company.find({});
        console.log("All companies:", companies);

        // Filter manually to see what's happening
        const userCompanies = companies.filter(company =>
            company.userId.toString() === userId
        );

        console.log("Filtered companies:", userCompanies);

        if (!userCompanies || userCompanies.length === 0) {
            return res.status(404).json({
                message: "Companies not found.",
                success: false
            })
        }

        return res.status(200).json({
            companies: userCompanies,
            success: true
        })
    } catch (error) {
        console.log("Error:", error);
        return res.status(500).json({
            message: "Server error",
            success: false
        })
    }
}

// get company by id
export const getCompanyById = async (req, res) => {
    try {
        const companyId = req.params.id;
        const company = await Company.findById(companyId);
        console.log("getCompanyById: ",companyId, " ", company)
        if (!company) {
            return res.status(404).json({
                message: "Company not found.",
                success: false
            })
        }
        return res.status(200).json({
            company,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}
export const updateCompany = async (req, res) => {
    try {
        const { name, description, website, location } = req.body;
        console.log("updateCompany")


        const file = req.file;
        // idhar cloudinary ayega
        const fileUri = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
        const logo = cloudResponse.secure_url;

        const updateData = { name, description, website, location, logo };

        const company = await Company.findByIdAndUpdate(req.params.id, updateData, { new: true });

        if (!company) {
            return res.status(404).json({
                message: "Company not found.",
                success: false
            })
        }
        return res.status(200).json({
            message: "Company information updated.",
            success: true
        })

    } catch (error) {
        console.log(error);
    }
}