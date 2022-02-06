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
  const { id } = req.query;

  if (req.method === "DELETE") {
    try {
      const deletePasien = await prisma.pasien.delete({
        where: {
          id: id as string,
        },
      });
      res.status(200).send(deletePasien);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  } else if (req.method === "PUT") {
    try {
      const body: PasienInput = req.body;
      const updatePasien = await prisma.pasien.update({
        where: {
          id: id as string,
        },
        data: {
          namaPasien: body.namaPasien,
          nik: body.nik,
          jenisKelamin: body.jenisKelamin,
          usia: parseInt(body.usia) || 0,
        },
      });
      res.status(200).send(updatePasien);
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
