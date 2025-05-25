import { NodeCard, NodeHealth } from "./NodeCard";

// Mock data - replace with real cluster data
const nodes: NodeHealth[] = [
  {
    name: "k8s-master-1",
    status: "Ready",
    role: "master",
    version: "v1.28.1",
    metrics: {
      cpu: 45,
      memory: 68,
      disk: 72,
    },
    conditions: [
      { type: "NetworkUnavailable", status: false },
      { type: "MemoryPressure", status: false },
      { type: "DiskPressure", status: false },
      { type: "PIDPressure", status: false },
    ],
  },
  {
    name: "k8s-worker-1",
    status: "Ready",
    role: "worker",
    version: "v1.28.1",
    metrics: {
      cpu: 78,
      memory: 82,
      disk: 55,
    },
    conditions: [
      { type: "NetworkUnavailable", status: false },
      { type: "MemoryPressure", status: true },
      { type: "DiskPressure", status: false },
      { type: "PIDPressure", status: false },
    ],
  },
  {
    name: "k8s-worker-2",
    status: "NotReady",
    role: "worker",
    version: "v1.28.1",
    metrics: {
      cpu: 0,
      memory: 0,
      disk: 45,
    },
    conditions: [
      { type: "NetworkUnavailable", status: true },
      { type: "MemoryPressure", status: false },
      { type: "DiskPressure", status: false },
      { type: "PIDPressure", status: false },
    ],
  },
];

export function ClusterOverview() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {nodes.map((node) => (
        <NodeCard key={node.name} node={node} />
      ))}
    </div>
  );
}
