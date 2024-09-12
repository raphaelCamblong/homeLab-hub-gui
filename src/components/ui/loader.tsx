import * as React from "react";
import { Loader as LoaderIcon } from "lucide-react";

const Loader: React.FC = () => {
  return (
    <div className="flex justify-center">
      <LoaderIcon size={34} className="animate-spin" />
    </div>
  );
};

export { Loader };
