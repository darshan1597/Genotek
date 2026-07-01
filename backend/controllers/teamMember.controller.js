import fs from "fs";
import path from "path";
import TeamMember from "../models/teamMember.model.js";

const parseBulletPoints = (value) => {
    if (!value) return [];
    try {
        const parsed = JSON.parse(value);
        return Array.isArray(parsed) ? parsed.map((item) => String(item).trim()).filter(Boolean) : [];
    } catch {
        return [];
    }
};

const normalizeTeamMemberOrders = async () => {
    const members = await TeamMember.find();
    members.sort((first, second) =>
        (first.displayOrder ?? 9999) - (second.displayOrder ?? 9999)
        || new Date(first.createdAt) - new Date(second.createdAt)
    );

    if (members.length) {
        await TeamMember.bulkWrite(
            members.map((member, index) => ({
                updateOne: {
                    filter: { _id: member._id },
                    update: { $set: { displayOrder: index + 1 } },
                },
            }))
        );
    }

    return members.length;
};

export const fetchTeamMembers = async (req, res) => {
    try {
        const members = await TeamMember.find();
        members.sort((first, second) =>
            (first.displayOrder ?? 9999) - (second.displayOrder ?? 9999)
            || new Date(first.createdAt) - new Date(second.createdAt)
        );
        return res.status(200).json(members);
    } catch (error) {
        return res.status(500).json({ message: `Error fetching team members ${error}` });
    }
};

export const fetchTeamMember = async (req, res) => {
    try {
        const member = await TeamMember.findById(req.params.id);
        if (!member) return res.status(404).json({ message: "Team member not found" });
        return res.status(200).json({ member });
    } catch (error) {
        return res.status(500).json({ message: `Error fetching team member ${error}` });
    }
};

export const addTeamMember = async (req, res) => {
    try {
        const bulletPoints = parseBulletPoints(req.body.bulletPoints);
        const displayOrder = Number(req.body.displayOrder);
        const memberCount = await TeamMember.countDocuments();

        if (!req.body.name?.trim() || !req.body.role?.trim() || !req.file || !Number.isInteger(displayOrder) || displayOrder < 1) {
            return res.status(400).json({ message: "Name, role, order number, and image are required" });
        }
        if (displayOrder > memberCount + 1) {
            return res.status(400).json({ message: `Order number must be between 1 and ${memberCount + 1}` });
        }

        await normalizeTeamMemberOrders();
        await TeamMember.updateMany(
            { displayOrder: { $gte: displayOrder } },
            { $inc: { displayOrder: 1 } }
        );

        const member = await TeamMember.create({
            name: req.body.name,
            role: req.body.role,
            displayOrder,
            about: req.body.about || "",
            bulletPoints,
            image: { name: req.file.filename },
        });
        return res.status(201).json({ message: "Team member added successfully", member });
    } catch (error) {
        return res.status(500).json({ message: `Error adding team member ${error}` });
    }
};

export const updateTeamMember = async (req, res) => {
    try {
        const bulletPoints = parseBulletPoints(req.body.bulletPoints);
        const displayOrder = Number(req.body.displayOrder);
        const memberCount = await TeamMember.countDocuments();

        if (!Number.isInteger(displayOrder) || displayOrder < 1 || displayOrder > memberCount) {
            return res.status(400).json({ message: `Order number must be between 1 and ${memberCount}` });
        }

        await normalizeTeamMemberOrders();
        const member = await TeamMember.findById(req.params.id);
        if (!member) return res.status(404).json({ message: "Team member not found" });
        const previousOrder = member.displayOrder;

        if (displayOrder < previousOrder) {
            await TeamMember.updateMany(
                {
                    _id: { $ne: member._id },
                    displayOrder: { $gte: displayOrder, $lt: previousOrder },
                },
                { $inc: { displayOrder: 1 } }
            );
        } else if (displayOrder > previousOrder) {
            await TeamMember.updateMany(
                {
                    _id: { $ne: member._id },
                    displayOrder: { $gt: previousOrder, $lte: displayOrder },
                },
                { $inc: { displayOrder: -1 } }
            );
        }

        member.name = req.body.name?.trim() || member.name;
        member.role = req.body.role?.trim() || member.role;
        member.displayOrder = displayOrder;
        member.about = req.body.about?.trim() || "";
        member.bulletPoints = bulletPoints;
        if (req.file) {
            if (member.image?.name) {
                const oldPath = path.join(process.cwd(), "public", "teamImages", member.image.name);
                if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
            }
            member.image = { name: req.file.filename };
        }

        await member.save();
        return res.status(200).json({ message: "Team member updated successfully", member });
    } catch (error) {
        return res.status(500).json({ message: `Error updating team member ${error}` });
    }
};

export const deleteTeamMember = async (req, res) => {
    try {
        const member = await TeamMember.findById(req.params.id);
        if (!member) return res.status(404).json({ message: "Team member not found" });
        if (member.image?.name) {
            const imagePath = path.join(process.cwd(), "public", "teamImages", member.image.name);
            if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
        }
        await member.deleteOne();
        await normalizeTeamMemberOrders();
        return res.status(200).json({ message: "Team member deleted successfully" });
    } catch (error) {
        return res.status(500).json({ message: `Error deleting team member ${error}` });
    }
};
