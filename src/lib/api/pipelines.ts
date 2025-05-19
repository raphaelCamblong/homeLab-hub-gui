import { Job, PipelineTemplate } from "@/types/api/pipeline";
import { fetchApi, FetchOptions, streamFetchApi } from "@/lib/api/index";

export const pipelinesApi = {
  getAllPipelines: (options?: FetchOptions) =>
    fetchApi<PipelineTemplate[]>("/pipelines", options),

  getPipelineById: (pipelineId: string, options?: FetchOptions) =>
    fetchApi<PipelineTemplate>(`/pipelines/${pipelineId}`, options),

  createPipeline: (data: Partial<PipelineTemplate>, options?: FetchOptions) =>
    fetchApi<PipelineTemplate>("/pipelines", {
      method: "POST",
      body: JSON.stringify(data),
      ...options,
    }),

  updatePipeline: (
    pipelineId: string,
    data: Partial<PipelineTemplate>,
    options?: FetchOptions,
  ) =>
    fetchApi<PipelineTemplate>(`/pipelines/${pipelineId}`, {
      method: "PUT",
      body: JSON.stringify(data),
      ...options,
    }),

  deletePipeline: (pipelineId: string, options?: FetchOptions) =>
    fetchApi<string>(`/pipelines/${pipelineId}`, {
      method: "DELETE",
      ...options,
    }),

  getPipelineJobs: (pipelineId: string, options?: FetchOptions) =>
    fetchApi<Job[]>(`/pipelines/${pipelineId}/jobs`, options),

  getRunningJobsStream: (options?: FetchOptions) =>
    streamFetchApi("/pipelines/jobs/stream", {
      ...options,
      requireAuth: true,
    }),

  createPipelineJob: (pipelineId: string, options?: FetchOptions) =>
    fetchApi<Job>(`/pipelines/${pipelineId}/jobs`, {
      method: "POST",
      ...options,
    }),

  stopPipelineJob: (jobId: string, options?: FetchOptions) =>
    fetchApi<string>(`/pipelines/jobs/${jobId}/stop`, {
      method: "POST",
      ...options,
    }),

  getCompletedJobs: (pipelineId: string, options?: FetchOptions) =>
    fetchApi<Job[]>(`/pipelines/${pipelineId}/jobs/completed`, options),

  getAllJobs: (options?: FetchOptions) =>
    fetchApi<Job[]>(`/pipelines/jobs`, options),

  getJobById: (jobId: string, options?: FetchOptions) =>
    fetchApi<Job>(`/pipelines/jobs/${jobId}`, options),
};
