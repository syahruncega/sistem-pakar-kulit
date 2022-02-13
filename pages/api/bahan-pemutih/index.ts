import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

import { prisma } from "@/libs/prisma";

type BahanPemutihInput = {
  kodeBahanPemutih: string;
  jenisBahanPemutih: string;
  presentaseKadarMax: string;
  solusi: string;
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
      const bahanPemutih = await prisma.bahanPemutih.findMany({
        orderBy: { kodeBahanPemutih: "asc" },
      });
      res.status(200).json(bahanPemutih);
    } catch (error) {
      console.error(error);
      res.status(500).json(error);
    }
  } else if (req.method === "POST") {
    try {
      const body: BahanPemutihInput = req.body;
      const createBahanPemutih = await prisma.bahanPemutih.create({
        data: {
          kodeBahanPemutih: body.kodeBahanPemutih,
          jenisBahanPemutih: body.jenisBahanPemutih,
          presentaseKadarMax: body.presentaseKadarMax,
          solusi: body.solusi,
        },
      });
      res.status(201).json(createBahanPemutih);
    } catch (error: any) {
      console.error(error);
      if (error.code === "P2002") {
        res.status(200).send("kodeBahanPemutih_unique");
      }
      res.status(500);
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
