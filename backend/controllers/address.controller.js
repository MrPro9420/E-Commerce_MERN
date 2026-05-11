import Address from "../models/address.model.js";

export const saveAddress = async (req, res) => {
  try {
    const newAddress = await Address.create(req.body);
    res
      .status(201)
      .json({ message: "Address added successfully", address: newAddress });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding address", error: error.message });
  }
};

export const getAddresses = async (req, res) => {
  try {
    const address = await Address.find({ userId: req.params.userId });
    res.status(200).json({ addresses: address });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching addresses", error: error.message });
  }
};
