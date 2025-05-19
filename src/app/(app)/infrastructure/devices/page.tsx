import { Building2, Cpu, HardDrive, Server } from "lucide-react";
import { PageContainer, PageTitle } from "@/components/navigation/Page";
import { WithPermission } from "@/components/auth/WithPermission";
import { AccessDenied } from "@/components/auth/AccessDenied";

export default function InfrastructurePage() {
  const iconClassName = "h-5 w-5 flex-shrink-0";
  const devices = [
    {
      icon: <HardDrive className={iconClassName} />,
      label: "Nas",
      href: "/infrastructure/nas",
    },
    {
      icon: <Server className={iconClassName} />,
      label: "Server",
      href: "/infrastructure/server",
    },
    {
      icon: <Cpu className={iconClassName} />,
      label: "Raspberry",
      href: "/infrastructure/raspberry",
    },
  ];
  return (
    <WithPermission permission="canViewMonitoring" fallback={<AccessDenied />}>
      <PageContainer>
        <PageTitle
          title="Infrastructure"
          icon={<Building2 className="h-6 w-6" />}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {devices.map((device) => (
              <div key={device.label}>
                {device.icon} {device.label}
              </div>
            ))}
          </div>
        </div>
      </PageContainer>
    </WithPermission>
  );
}
