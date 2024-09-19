import type { NextApiRequest, NextApiResponse } from "next";
import Backend from "@/services/backend/Backend";
import { serialize } from "cookie";

function saveCookie(req: NextApiRequest, res: NextApiResponse) {
  const encryptedSessionData = req.body;

  const cookie = serialize("session", encryptedSessionData, {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7, // One week
    path: "/",
  });
  res.setHeader("Set-Cookie", cookie);
  console.log("Session store", encryptedSessionData);
}

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  const { email, password } = req.body;

  return await Backend.getInstance()
    .login(email, password)
    .then((dataresp) => {
      req.body = dataresp;
      saveCookie(req, res);
      return dataresp.json();
    })
    .catch((error) => {
      if (error.type === "CredentialsSignin") {
        res.status(401).json({ error: "Invalid credentials." });
      } else {
        res.status(500).json({ error: "Something went wrong." });
      }
      return res;
    });
}
