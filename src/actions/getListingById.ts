import Listing from "@/models/listing.model";
import { connectDB } from "@/lib/db";

export default async function getListings() {
  try {
    await connectDB();
    const listings = await Listing.find()
      .populate("host", "name email image")
      .sort({ createdAt: -1 })
      .lean();
    return JSON.parse(JSON.stringify(listings));
  } catch (error) {
    console.error(error);
    return [];
  }
}
