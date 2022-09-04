import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

import { prisma } from "@/libs/prisma";
import { GejalaInput } from "@/utils/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });

  if (req.method === "GET") {
    try {
      const gejala = await prisma.gejala.findMany({
        orderBy: { kodeGejala: "asc" },
      });
      res.status(200).json(gejala);
    } catch (error) {
      console.error(error);
      res.status(500).json(error);
    }
  } else if (req.method === "POST") {
    if (!session) {
      res.status(401).json({ message: "Unauthorized" });
    }
    try {
      const body: GejalaInput = req.body;
      const createGejala = await prisma.gejala.create({
        data: {
          kodeGejala: body.kodeGejala,
          namaGejala: body.namaGejala,
          nilaiKepastian: parseFloat(body.nilaiKepastian) || 0,
          keterangan: body.keterangan,
          labelCukupYakin: body.labelCukupYakin,
          labelSangatYakin: body.labelSangatYakin,
          urlGambar: body.urlGambar,
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
