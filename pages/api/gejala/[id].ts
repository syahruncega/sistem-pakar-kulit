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
  const { id } = req.query;

  if (req.method === "DELETE") {
    try {
      const deleteGejala = await prisma.gejala.delete({
        where: {
          id: id as string,
        },
      });
      res.status(200).send(deleteGejala);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  } else if (req.method === "PUT") {
    try {
      const body: GejalaInput = req.body;
      const updateGejala = await prisma.gejala.update({
        where: {
          id: id as string,
        },
        data: {
          kodeGejala: body.kodeGejala,
          namaGejala: body.namaGejala,
          nilaiKepastian: parseFloat(body.nilaiKepastian) || 0,
        },
      });
      res.status(200).send(updateGejala);
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
