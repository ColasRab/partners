import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const partners = await prisma.partner.findMany();
    const partnersWithBase64 = partners.map((partner) => ({
      id: partner.id,
      name: partner.name,
      logo: `data:image/png;base64,${Buffer.from(partner.logo).toString("base64")}`,
    }));
    res.status(200).json(partnersWithBase64);
  } catch (error) {
    console.error("Error fetching partners:", error);
    res.status(500).json({ error: "Error fetching partners" });
  }
}
