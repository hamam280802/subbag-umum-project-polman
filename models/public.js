import mongoose, {Schema} from "mongoose";

const pubSchema = new Schema(
    {
        title: String,
        link: String
    },
    {
        timestamps: true,
    }
);

const Public = mongoose.models.Public || mongoose.model("Public", pubSchema)

export default Public;