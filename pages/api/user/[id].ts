import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

import { prisma } from "@/libs/prisma";
import hasher from "utils/hasher";

type UserInput = {
  email: string;
  name: string;
  password: string;
  role: any;
  hash: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });
  if (!session) {
    res.status(401).json({ message: "Unauthorized" });
  }
  const { id } = req.query;

  if (req.method === "DELETE") {
    try {
      const deleteUser = await prisma.user.delete({
        where: {
          id: id as string,
        },
      });
      res.status(200).send(deleteUser);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  } else if (req.method === "PUT") {
    try {
      const body: UserInput = req.body;
      const updateUser = await prisma.user.update({
        where: {
          id: id as string,
        },
        data: {
          email: body.email,
          name: body.name,
          hash: body.password ? hasher(body.password) : body.hash,
          verified: true,
          role: body.role,
        },
      });
      res.status(200).send(updateUser);
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
