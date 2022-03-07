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
  const { id } = req.query;

  if (req.method === "DELETE") {
    try {
      const deleteRiwayatDiagnosa = await prisma.riwayatDiagnosa.delete({
        where: {
          id: id as string,
        },
      });
      res.status(200).send(deleteRiwayatDiagnosa);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  } else if (req.method === "PUT") {
    try {
      const body: RiwayatDiagnosaInputs = req.body;
      const updateRiwayatDiagnosa = await prisma.riwayatDiagnosa.update({
        where: {
          id: id as string,
        },
        data: {
          gejala: body.gejala,
          detail: body.detail,
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
      res.status(200).send(updateRiwayatDiagnosa);
    } catch (error: any) {
      console.error(error);
      res.status(500);
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
