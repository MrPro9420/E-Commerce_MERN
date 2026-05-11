import mongoose from "mongoose";
const addressSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    fullname: String,
    phone: String,
    addressline: String,
    city: String,
    state: String,
    pincode: String,
    country: String,
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Address", addressSchema);
