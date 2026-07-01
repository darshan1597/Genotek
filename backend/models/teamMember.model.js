import mongoose from "mongoose";

const teamMemberSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true },
        role: { type: String, required: true, trim: true },
        displayOrder: { type: Number, min: 1, default: 9999 },
        about: { type: String, default: "", trim: true },
        bulletPoints: [{ type: String, trim: true }],
        image: { name: { type: String, required: true } },
    },
    { timestamps: true }
);

const TeamMember = mongoose.model("TeamMember", teamMemberSchema);

export default TeamMember;
