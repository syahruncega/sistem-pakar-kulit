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

  if (req.method === "GET") {
    try {
      const basisPengetahuan = await prisma.basisPengetahuan.findMany({
        orderBy: { rule: "asc" },
        include: {
          bahanPemutih: true,
        },
      });
      res.status(200).json(basisPengetahuan);
    } catch (error) {
      console.error(error);
      res.status(500).json(error);
    }
  } else if (req.method === "POST") {
    if (!session) {
      res.status(401).json({ message: "Unauthorized" });
    }
    try {
      const body: BasisPengetahuanInput = req.body;
      const createBasisPengetahuan = await prisma.basisPengetahuan.create({
        data: {
          rule: body.rule,
          kaidah: body.kaidah,
        },
        include: {
          bahanPemutih: true,
        },
      });
      res.status(201).json(createBasisPengetahuan);
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
