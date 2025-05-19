import { NextRequest } from "next/server";
import { pipelinesApi } from "@/lib/api/pipelines";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  const upstreamRes = await pipelinesApi.getRunningJobsStream();

  if (!upstreamRes.ok || !upstreamRes.body) {
    return new Response("Upstream error", { status: 502 });
  }

  return new Response(upstreamRes.body, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
