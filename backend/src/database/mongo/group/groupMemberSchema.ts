import mongoose, { Schema, Document, Types } from "mongoose";
import z from "zod";
import { GroupRole } from "../../../entities/group/GroupMember"; // import your enum

export interface GroupMemberDocument extends Document {
  _id: Types.ObjectId;
  groupId: Types.ObjectId; // reference to Group
  userId: Types.ObjectId; // reference to User
  role: GroupRole;
  joinedAt: Date;
}

export const GroupMemberZodSchema = z.object({
  groupId: z.string().min(1, "GroupId is required"),
  userId: z.string().min(1, "UserId is required"),
  role: z.nativeEnum(GroupRole).default(GroupRole.MEMBER),
  joinedAt: z.date().default(() => new Date()),
});

const GroupMemberSchema = new Schema<GroupMemberDocument>(
  {
    groupId: { type: Schema.Types.ObjectId, ref: "Group", required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    role: {
      type: String,
      enum: Object.values(GroupRole),
      default: GroupRole.MEMBER,
    },
    joinedAt: { type: Date, default: Date.now },
  },
  { timestamps: false }
);

export const GroupMemberModel = mongoose.model<GroupMemberDocument>(
  "GroupMember",
  GroupMemberSchema
);
