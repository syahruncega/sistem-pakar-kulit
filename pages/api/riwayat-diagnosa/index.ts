import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

import { prisma } from "@/libs/prisma";

type RiwayatDiagnosaInputs = {
  idPasien: string;
  idBahanPemutih: string;
  gejala: any;
  detail: any;
  nilaiCF: number;
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
      const riwayatDiagnosa = await prisma.riwayatDiagnosa.findMany({
        orderBy: { updatedAt: "desc" },
        include: {
          bahanPemutih: true,
          pasien: true,
        },
      });
      res.status(200).json(riwayatDiagnosa);
    } catch (error) {
      console.error(error);
      res.status(500).json(error);
    }
  } else if (req.method === "POST") {
    try {
      const body: RiwayatDiagnosaInputs = req.body;
      const createRiwayatDiagnosa = await prisma.riwayatDiagnosa.create({
        data: {
          gejala: body.gejala.toString(),
          detail: body.detail.toString(),
          nilaiCF: body.nilaiCF,
          pasien: {
            connect: {
              id: body.idPasien,
            },
          },
          bahanPemutih: {
            connect: {
              id: body.idBahanPemutih,
            },
          },
        },
        include: {
          bahanPemutih: true,
          pasien: true,
        },
      });
      res.status(201).json(createRiwayatDiagnosa);
    } catch (error: any) {
      console.error(error);
      res.status(500);
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
