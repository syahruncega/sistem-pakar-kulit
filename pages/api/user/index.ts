import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

import { prisma } from "@/libs/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });

  if (!session) {
    res.status(401).json({ message: "Unauthorized" });
  }

  if (req.method === "GET") {
    try {
      const user = await prisma.user.findMany({
        orderBy: { updatedAt: "desc" },
      });
      res.status(200).json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json(error);
    }
  }
}
