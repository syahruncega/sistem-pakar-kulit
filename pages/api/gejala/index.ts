import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

import { prisma } from "@/libs/prisma";

type GejalaInput = {
  kodeGejala: string;
  namaGejala: string;
  nilaiKepastian: string;
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
      const gejala = await prisma.gejala.findMany({
        orderBy: { updatedAt: "desc" },
      });
      res.status(200).json(gejala);
    } catch (error) {
      console.error(error);
      res.status(500).json(error);
    }
  } else if (req.method === "POST") {
    try {
      const body: GejalaInput = req.body;
      const createGejala = await prisma.gejala.create({
        data: {
          kodeGejala: body.kodeGejala,
          namaGejala: body.namaGejala,
          nilaiKepastian: parseFloat(body.nilaiKepastian) || 0,
        },
      });
      res.status(201).json(createGejala);
    } catch (error: any) {
      console.error(error);
      if (error.code === "P2002") {
        res.status(200).send("kodeGejala_unique");
      }
      res.status(500);
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
