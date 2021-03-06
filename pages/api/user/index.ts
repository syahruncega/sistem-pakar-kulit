import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

import { prisma } from "@/libs/prisma";
import hasher from "@/utils/hasher";

type UserInput = {
  email: string;
  name: string;
  password: string;
  role: any;
};

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
  } else if (req.method === "POST") {
    try {
      const body: UserInput = req.body;
      const createUser = await prisma.user.create({
        data: {
          email: body.email,
          name: body.name,
          hash: hasher(body.password),
          verified: true,
          role: body.role,
        },
      });
      res.status(201).json(createUser);
    } catch (error: any) {
      console.error(error);
      if (error.code === "P2002") {
        res.status(200).send("email_unique");
      }
      res.status(500);
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
