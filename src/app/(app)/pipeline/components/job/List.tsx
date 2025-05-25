"use client";

import { getElapsedTime } from "@/lib/utils";
import { Job, Step } from "@/types/api/pipeline";
import { JobCard } from "./Card";
import { useEffect, useState, useCallback } from "react";
import React from "react";

const areJobStepsEqual = (a: Step[], b: Step[]) => {
  if (a === b) return true;
  if (a.length !== b.length) return false;

  for (let i = 0; i < a.length; i++) {
    if (a[i].ID !== b[i].ID) return false;
    if (a[i].status !== b[i].status) return false;
  }

  return true;
};

const MemoizeJobCard = React.memo(JobCard, (prevProps, nextProps) => {
  return (
    prevProps.job.ID === nextProps.job.ID &&
    prevProps.job.status === nextProps.job.status &&
    prevProps.job.UpdatedAt === nextProps.job.UpdatedAt &&
    areJobStepsEqual(prevProps.job.steps, nextProps.job.steps)
  );
});

const RunningJobList = () => {
  const [jobs, setJobs] = useState<Map<number, Job>>(new Map());
  const [connectionError, setConnectionError] = useState<string | null>(null);

  const handleJobUpdate = useCallback((job: Job) => {
    setJobs((prevMap) => {
      const newMap = new Map(prevMap);
      if (job.status === "running") {
        newMap.set(job.ID, job);
      } else {
        newMap.delete(job.ID);
      }
      return newMap;
    });
  }, []);

  useEffect(() => {
    let eventSource: EventSource | null = null;

    const setupSSEConnection = () => {
      if (eventSource) {
        eventSource.close();
      }
      setConnectionError(null);

      eventSource = new EventSource("/api/pipelines/jobs/stream", {
        withCredentials: true,
      });

      eventSource.addEventListener("job", (event) => {
        const job = JSON.parse(event.data);
        handleJobUpdate(job);
      });

      eventSource.onopen = (event) => {
        setConnectionError(null);
      };

      eventSource.onerror = (event) => {
        console.error("[Client] Connection error:", event);
        setConnectionError("Connection lost. Retrying...");
        if (eventSource?.readyState === EventSource.CLOSED) {
          eventSource.close();
        }
      };
    };

    setupSSEConnection();

    return () => {
      if (eventSource) {
        eventSource.close();
      }
    };
  }, [handleJobUpdate]);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Running Jobs</h2>
      {connectionError && (
        <div className="mb-4 p-4 bg-red-50 text-red-700 rounded-md">
          {connectionError}
        </div>
      )}
      <div className="grid gap-4 sm:grid-cols-1">
        {jobs.size > 0 &&
          Array.from(jobs.values()).map((job, index) => (
            <div
              key={job.ID}
              className="animate-fade-up"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <MemoizeJobCard job={job} />
            </div>
          ))}
        {!jobs.size && !connectionError && (
          <div className="flex min-h-[200px] items-center justify-center rounded-lg border border-dashed animate-fade-up">
            <div className="text-center">
              <h3 className="text-lg font-medium">No running jobs.</h3>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RunningJobList;
