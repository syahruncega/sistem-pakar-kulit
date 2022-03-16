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

  if (req.method === "GET") {
    try {
      const basisPengetahuan = await prisma.basisPengetahuan.count();
      const gejala = await prisma.gejala.count();
      const bahanPemutih = await prisma.bahanPemutih.count();
      const pasien = await prisma.pasien.count();
      const riwayatDiagnosa = await prisma.pasien.count();

      res
        .status(200)
        .json({
          basisPengetahuan,
          gejala,
          bahanPemutih,
          pasien,
          riwayatDiagnosa,
        });
    } catch (error) {
      console.error(error);
      res.status(500).json(error);
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
