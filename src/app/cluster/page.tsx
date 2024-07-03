import React from "react";

interface ClusterProps {
  name: string;
}

const Cluster: React.FC<ClusterProps> = ({ name }) => {
  return (
    <div>
      <h1>Welcome to the Cluster component, {name}!</h1>
      {/* Add your content here */}
    </div>
  );
};

export default Cluster;
