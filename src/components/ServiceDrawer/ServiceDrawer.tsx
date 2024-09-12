"use client";
import React from "react";
import { Service } from "@/services/backend/types/Service";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { CircleDot, CircleDotDashed, Forward, ListPlus } from "lucide-react";
import { Separator } from "../ui/separator";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";

interface ServiceDrawerProps {
  service: Service;
}

const ServiceDrawer: React.FC<ServiceDrawerProps> = ({ service }) => {
  const router = useRouter();

  const goToService = () => router.push(service.url);

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button>
          <ListPlus />
          See more
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="flex flex-row items-center gap-2">
            {service.name}
            {service.state === "running" ? (
              <CircleDot color="green" aria-label="Running" />
            ) : (
              <CircleDotDashed color="red" aria-label="Stopped" />
            )}
          </DrawerTitle>
        </DrawerHeader>
        <div className="flex flex-col gap-2 p-2">
          <Button className="m-4" onClick={goToService}>
            <Forward />
            Open service gui
          </Button>
          <Separator />
          <p>Description: {service.description}</p>
          <Separator />
          <p>Created at: {service.createdAt}</p>
          <p>Updated at: {service.updatedAt}</p>
          <Separator />
          <div className="flex flex-row gap-4 p-2">
            {service?.tags?.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </DrawerContent>
      <DrawerDescription></DrawerDescription>
    </Drawer>
  );
};

export { ServiceDrawer };
