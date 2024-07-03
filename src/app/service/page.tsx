"use client";
import React from "react";
import { ServiceCard } from "@/components/ServiceCard";
import { Separator } from "@/components/ui/separator";
import { useService } from "@/services/api/hooks/useService";
import { Loader } from "lucide-react";

interface ServiceProps {
  name: string;
}

const Service: React.FC<ServiceProps> = ({ name }) => {
  const { services, isError, isLoading } = useService();
  // const services: ServiceModel[] = [
  //   {
  //     id: "grafana",
  //     name: "Grafana",
  //     url: "https://grafana.example.com",
  //     logo_path: getIconSvg("grafana"),
  //     description: "Cluster dashboard and metrics",
  //     tags: ["monitoring"],
  //     state: "running",
  //   },
  //   {
  //     id: "k3s",
  //     name: "K3S",
  //     url: "https://k3s.example.com",
  //     logo_path: getIconSvg("k3s"),
  //     description: "Service 2 description",
  //     tags: ["node", "kubernetes"],
  //     state: "stopped",
  //   },
  //   {
  //     id: "prometheus",
  //     name: "Prometheus",
  //     url: "",
  //     logo_path: getIconSvg("prometheus"),
  //     description: "Cluster monitoring and alerting",
  //     tags: ["node", "monitoring", "alerting", "kubernetes", "prometheus"],
  //     state: "stopped",
  //   },
  //   {
  //     id: "argocd",
  //     name: "ArgoCD",
  //     url: "",
  //     logo_path: getIconSvg("argocd"),
  //     description: "GitOps for kubernetes",
  //     tags: ["node", "kubernetes", "gitops", "ci/cd"],
  //     state: "running",
  //   },
  //   {
  //     id: "homekit",
  //     name: "HomeKit",
  //     url: "",
  //     logo_path: getIconSvg("homekit"),
  //     description: "HomeKit automation by Apple",
  //     tags: ["homekit", "automation"],
  //     state: "stopped",
  //   },
  // ];

  return (
    <div className="flex flex-col gap-4">
      <h2>Service</h2>
      <Separator />
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {isLoading && <Loader />}
        {isError && <div>{isError}</div>}
        {services?.map((service) => (
          <ServiceCard key={service.name} service={service} />
        ))}
      </div>
    </div>
  );
};

export default Service;
