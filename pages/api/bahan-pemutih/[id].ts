import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

import { prisma } from "@/libs/prisma";
import hasher from "utils/hasher";

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
  const { id } = req.query;

  if (req.method === "DELETE") {
    try {
      const deleteBahanPemutih = await prisma.bahanPemutih.delete({
        where: {
          id: id as string,
        },
      });
      res.status(200).send(deleteBahanPemutih);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  } else if (req.method === "PUT") {
    try {
      const body: BahanPemutihInput = req.body;
      const updateBahanPemutih = await prisma.bahanPemutih.update({
        where: {
          id: id as string,
        },
        data: {
          kodeBahanPemutih: body.kodeBahanPemutih,
          jenisBahanPemutih: body.jenisBahanPemutih,
          presentaseKadarMax: body.presentaseKadarMax,
          solusi: body.solusi,
        },
      });
      res.status(200).send(updateBahanPemutih);
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
