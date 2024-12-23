import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import User from "@/models/User";
import { getServerSession } from "next-auth";

export const validateSession = async () => {
  const session = (await getServerSession(authOptions)) as {
    user: { _id: string };
  };
  if (!session) return false;
  const user = await User.findById(session.user?._id);
  if (!user) return false;
  return true;
};
