const Manager = require("../models/managerModel");

const createManager = async (req, res) => {
    try {
        const {accessPass} = req.body
        if(accessPass !== process.env.ACCOUNT_ACCESS_PASS){
            return res.status(401).json({
                status: "fail",
                message: "You don't have access to create account!"
            })
        }
        req.body.accessPass = undefined;
        const manager = await Manager.findOne({
            email: req.body.email
        })
        if(manager){
            throw new Error("User already exist!")
        }
        const newManager = await Manager.create(req.body);
        newManager.password = undefined;
        res.status(201).json({
            status: "success",
            data: newManager,
            message: "Manager created successfully",
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error.message,
        });
    }
}

const getManagers = async (req, res) => {
    try {
        const managers = await Manager.find().select("-__v -password");
        res.status(200).json({
            status: "success",
            data: managers,
            message: "Managers fetched successfully",
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error.message,
        });
    }
}

const getManagerById = async (req, res) => {
    try {
        const manager = await Manager.findById(req.params.id).select("-__v -password");
        if (!manager) return res.status(404).json({ message: "Manager not found" });
        res.status(200).json({
            status: "success",
            data: manager,
            message: "Manager fetched successfully",
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error.message,
        });
    }
}

const updateManager = async (req, res) => {
    try {
        const updatedManager = await Manager.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        ).select("-__v -password");
        if (!updatedManager)
            return res.status(404).json({
                status: "fail",
                message: "Manager not found",
            });
        res.status(200).json({
            status: "success",
            data: updatedManager,
            message: "Manager updated successfully",
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error.message,
        });
    }
}

const deleteManager = async (req, res) => {
    try {
        const deletedManager = await Manager.findByIdAndDelete(req.params.id);
        if (!deletedManager)
            return res.status(404).json({
                status: "fail",
                message: "Manager not found",
            });
        res.status(200).json({
            status: "success",
            message: "Manager deleted successfully",
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error.message,
        });
    }
}

module.exports = {
    createManager,
    updateManager,
    getManagerById,
    getManagers,
    deleteManager
}