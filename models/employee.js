import mongoose, {Schema} from "mongoose";

const empSchema = new Schema(
    {
        title: String,
        link: String
    },
    {
        timestamps: true,
    }
);

const Employee = mongoose.models.Employee || mongoose.model("Employee", empSchema)

export default Employee;