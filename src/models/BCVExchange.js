import { Schema, model } from "mongoose";

const bcvExchangeSchema = new Schema({
    exchange: { type: Number, required: true },
});

export default model('bcvexchanges', bcvExchangeSchema)