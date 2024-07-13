import mongoose from "mongoose";


const StopSchema = new mongoose.Schema({
    'Stop Start Location': { type: String, required: false },
    'Stop Start Date': { type: Date, required: false },
    'Stop End Location': { type: String, required: false },
    'Stop End Date': { type: Date, required: false }
});

const TravelSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    title: { type: String, required: true },
    startLocation: { type: String, required: true },
    startDate: { type: Date, required: true },
    endLocation: { type: String, required: true },
    endDate: { type: Date, required: true },
    description: { type: String, required: true },
    travel_img: { type: String, required: true },
    stops: [StopSchema]
}, { timestamps: true });

const Travel = mongoose.model("Travel", TravelSchema, "travels");

export default Travel;