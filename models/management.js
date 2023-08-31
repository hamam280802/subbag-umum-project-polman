import mongoose, {Schema} from "mongoose";

const manSchema = new Schema(
    {
        title: String,
        link: String
    },
    {
        timestamps: true,
    }
);

const Management = mongoose.models.Management || mongoose.model("Management", manSchema)

export default Management;