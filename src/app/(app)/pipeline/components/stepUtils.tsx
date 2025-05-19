import { Status, Step } from "@/types/api/pipeline";
import {
  AlertCircle,
  AlertTriangle,
  CheckCircle2,
  StopCircle,
  Timer,
} from "lucide-react";

export const getStatusIcon = (status: Status) => {
  switch (status) {
    case Status.Completed:
      return <CheckCircle2 className="h-4 w-4" />;
    case Status.Running:
      return <Timer className="h-4 w-4 animate-spin" />;
    case Status.Failed:
      return <AlertCircle className="h-4 w-4" />;
    case Status.Pending:
      return <AlertTriangle className="h-4 w-4" />;
    case Status.Success:
      return <CheckCircle2 className="h-4 w-4" />;
    case Status.Stopped:
      return <StopCircle className="h-4 w-4" />;
    default:
      return <AlertTriangle className="h-4 w-4" />;
  }
};

export const getStatusColor = (status: Status) => {
  switch (status) {
    case Status.Completed:
      return "bg-green-pastel/10 text-green-pastel border-green-pastel/20";
    case Status.Running:
      return "bg-indigo-dye/10 text-indigo-dye border-indigo-dye/20";
    case Status.Failed:
      return "bg-red-pastel/10 text-red-pastel border-red-pastel/20";
    case Status.Pending:
      return "bg-indigo-dye/10 text-indigo-dye border-indigo-dye/20";
    case Status.Success:
      return "bg-green-pastel/10 text-green-pastel border-green-pastel/20";
    case Status.Stopped:
      return "bg-indigo-dye/10 text-indigo-dye border-indigo-dye/20";
    default:
      return "bg-gray-500/10 text-gray-500 border-gray-500/20";
  }
};

export const getProgressPercentage = (steps: Step[]) => {
  if (!steps?.length) return 0;
  const completed = steps.filter(
    (s) => s.status === Status.Completed || s.status === Status.Success
  ).length;
  return Math.round((completed / steps.length) * 100);
};
