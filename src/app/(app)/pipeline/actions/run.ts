"use server";

import { pipelinesApi } from "@/lib/api/pipelines";
import { revalidatePath } from "next/cache";

export async function runPipeline(pipelineId: string) {
  try {
    const response = await pipelinesApi.createPipelineJob(pipelineId);
    revalidatePath("/pipeline");
  } catch (error) {
    console.error("Error triggering action:", error);
  }
}

export async function stopPipeline(jobId: string) {
  try {
    const response = await pipelinesApi.stopPipelineJob(jobId);
    revalidatePath("/pipeline");
  } catch (error) {
    console.error("Error stopping pipeline:", error);
  }
}
