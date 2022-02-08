import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

import { prisma } from "@/libs/prisma";

type BasisPengetahuanInput = {
  rule: string;
  kaidah: string;
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
      const deleteBasisPengetahuan = await prisma.basisPengetahuan.delete({
        where: {
          id: id as string,
        },
      });
      res.status(200).send(deleteBasisPengetahuan);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  } else if (req.method === "PUT") {
    try {
      const body: BasisPengetahuanInput = req.body;
      const updateBasisPengetahuan = await prisma.basisPengetahuan.update({
        where: {
          id: id as string,
        },
        data: {
          rule: body.rule,
          kaidah: body.kaidah,
        },
      });
      res.status(200).send(updateBasisPengetahuan);
    } catch (error: any) {
      console.error(error);
      if (error.code === "P2002") {
        res.status(200).send("rule_unique");
      }
      res.status(500);
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
