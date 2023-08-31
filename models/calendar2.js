import mongoose, {Schema} from "mongoose";

const calSchema = new Schema(
    {
        title: String,
        start: Date,
        allDay: Boolean,
        id: Number
    },
    {
        timestamps: true,
    }
);

const Calendar2 = mongoose.models.Calendar2 || mongoose.model("Calendar2", calSchema)

export default Calendar2;