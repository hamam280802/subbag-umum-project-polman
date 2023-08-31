import mongoose, {Schema} from "mongoose";

const monSchema = new Schema(
    {
        title: String,
        link: String
    },
    {
        timestamps: true,
    }
);

const Money = mongoose.models.Money || mongoose.model("Money", monSchema)

export default Money;