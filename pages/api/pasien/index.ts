import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

import { prisma } from "@/libs/prisma";

type PasienInput = {
  namaPasien: string;
  nik: string;
  jenisKelamin: string;
  usia: string;
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
      const pasien = await prisma.pasien.findMany({
        orderBy: { updatedAt: "desc" },
      });
      res.status(200).json(pasien);
    } catch (error) {
      console.error(error);
      res.status(500).json(error);
    }
  } else if (req.method === "POST") {
    try {
      const body: PasienInput = req.body;
      const createPasien = await prisma.pasien.create({
        data: {
          namaPasien: body.namaPasien,
          nik: body.nik,
          jenisKelamin: body.jenisKelamin,
          usia: parseInt(body.usia) || 0,
        },
      });
      res.status(201).json(createPasien);
    } catch (error: any) {
      console.error(error);
      if (error.code === "P2002") {
        res.status(200).send("nik_unique");
      }
      res.status(500);
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
