import { getServerSession } from "next-auth";
import User from "@/models/user.models";
import { connectDB } from "@/lib/db";
import { authOptions } from "../app/api/auth/[...nextauth]/route";

export async function getCurrentUser() {
  await connectDB();

  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return null;
  }

  const currentUser = await User.findOne({
    email: session.user.email,
  });

  return currentUser;
}
