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

export const fetchTeamMembers = async (req, res) => {
    try {
        const members = await TeamMember.find().sort({ createdAt: 1 });
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

        if (!req.body.name?.trim() || !req.body.role?.trim() || !req.file) {
            return res.status(400).json({ message: "Name, role, and image are required" });
        }

        const member = await TeamMember.create({
            name: req.body.name,
            role: req.body.role,
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
        const member = await TeamMember.findById(req.params.id);
        if (!member) return res.status(404).json({ message: "Team member not found" });
        const bulletPoints = parseBulletPoints(req.body.bulletPoints);

        member.name = req.body.name?.trim() || member.name;
        member.role = req.body.role?.trim() || member.role;
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
        return res.status(200).json({ message: "Team member deleted successfully" });
    } catch (error) {
        return res.status(500).json({ message: `Error deleting team member ${error}` });
    }
};
