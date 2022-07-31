import { BahanPemutih } from "@prisma/client";
import { format } from "date-fns";
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

export async function printHasilDiagnosa(
  hasilDiagnosa: BahanPemutih,
  persentasi: string,
  gejala: any[]
) {
  const docDefinition = {
    info: {
      title: "Hasil Diagnosa",
    },
    content: [
      {
        alignment: "justify",
        columns: [
          {
            text: [
              {
                text: "e-Clinic",
                fontSize: 20,
                bold: true,
              },
            ],
            alignment: "left",
          },
          {
            text: format(new Date(), "dd MMMM yyyy"),
            alignment: "right",
            marginTop: 8,
          },
        ],
      },
      {
        canvas: [
          {
            type: "line",
            x1: 0,
            y1: 4,
            x2: 520,
            y2: 6,
            lineWidth: 1.2,
          },
        ],
      },
      { text: "Gejala anda:", style: "h1", marginTop: 30 },
      {
        style: "tableExample",
        table: {
          widths: [26, "*", 120],
          body: [
            ["No", "Gejala", "Jawaban"],
            ...gejala.map((v, index) => {
              return [`${index + 1}`, `${v.gejala}`, `${v.jawaban}`];
            }),
          ],
        },
      },
      { text: "Hasil diagnosa:", style: "h1" },
      {
        text: hasilDiagnosa.jenisBahanPemutih,
        alignment: "center",
        style: "h2",
      },
      {
        text: `Persentasi (${persentasi}%)`,
        alignment: "center",
        style: "h3",
        marginBottom: 10,
      },
      {
        text: "Kadar Maksimum Penggunaan: ",
        alignment: "center",
        style: "h3",
      },
      {
        text: hasilDiagnosa.presentaseKadarMax,
        alignment: "center",
        style: "h3",
      },
      { text: "Solusi:", style: "h1" },
      { text: hasilDiagnosa.solusi, alignment: "justify" },
    ],
    styles: {
      h1: {
        fontSize: 16,
        bold: true,
        margin: [0, 10, 0, 5],
      },
      h2: {
        fontSize: 14,
        bold: true,
        margin: [0, 5, 0, 5],
      },
      h3: {
        fontSize: 12,
        bold: true,
        margin: [0, 0, 0, 4],
      },
      tableExample: {
        margin: [0, 5, 0, 15],
      },
      tableHeader: {
        bold: true,
        alignment: "center",
      },
    },
  };
  pdfMake.createPdf(docDefinition as any).open();
}
