import { DiskUsageCard } from './DiskUsageCard';
import { ZfsPoolStatus } from './ZfsPoolStatus';

// Mock data - replace with real data from your API
const disks = [
    {
        name: "Disk 1",
        used: 1250,
        total: 2000,
        temperature: 42,
        smart: {
            reallocatedSectors: 0,
            powerOnHours: 8760, // 1 year
            temperature: 42,
            lastTestStatus: 'PASS' as const
        },
        isRaidMember: true,
        raidRole: "Primary"
    },
    {
        name: "Disk 2",
        used: 1800,
        total: 2000,
        temperature: 45,
        smart: {
            reallocatedSectors: 2,
            powerOnHours: 17520, // 2 years
            temperature: 45,
            lastTestStatus: 'PASS' as const
        },
        isRaidMember: true,
        raidRole: "Secondary"
    },
    // Add more disks as needed
];

export function StorageView() {
    return (
        <div className="space-y-6">
            <ZfsPoolStatus />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {disks.map((disk) => (
                    <DiskUsageCard
                        key={disk.name}
                        {...disk}
                    />
                ))}
            </div>
        </div>
    );
} 