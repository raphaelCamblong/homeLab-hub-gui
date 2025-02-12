import { HeartPulse, DatabaseZap, Cloud } from "lucide-react";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { PageContainer, PageTitle } from "@/components/navigation/Page";

export default function MonitoringPage() {
    return (
        <PageContainer>
            <PageTitle title="System Monitoring" icon={<HeartPulse className="h-6 w-6" />} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Link href="/monitoring/nas" className="block">
                    <Card className="h-full transition-all duration-300 hover:shadow-xl dark:hover:shadow-2xl dark:hover:shadow-blue-900/20 hover:-translate-y-1">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <DatabaseZap className="h-5 w-5 text-blue-500" />
                                NAS Monitoring
                            </CardTitle>
                            <CardDescription>
                                Monitor your NAS system health, storage pools, and disk status
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <div className="text-sm font-medium">Storage Pools</div>
                                    <div className="text-2xl font-bold text-blue-500">ZFS</div>
                                </div>
                                <div className="space-y-1">
                                    <div className="text-sm font-medium">RAID Config</div>
                                    <div className="text-2xl font-bold text-blue-500">RAID5</div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </Link>

                <Link href="/monitoring/cluster" className="block">
                    <Card className="h-full transition-all duration-300 hover:shadow-xl dark:hover:shadow-2xl dark:hover:shadow-blue-900/20 hover:-translate-y-1">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Cloud className="h-5 w-5 text-green-500" />
                                Cluster Monitoring
                            </CardTitle>
                            <CardDescription>
                                Monitor your Kubernetes cluster health, nodes, and workloads
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <div className="text-sm font-medium">Nodes</div>
                                    <div className="text-2xl font-bold text-green-500">3</div>
                                </div>
                                <div className="space-y-1">
                                    <div className="text-sm font-medium">Workloads</div>
                                    <div className="text-2xl font-bold text-green-500">12</div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </Link>
            </div>
            <div className="mt-8">


                <Card>
                    <CardHeader>
                        <CardTitle>System Overview</CardTitle>
                        <CardDescription>
                            Overall system health and metrics
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="p-4 rounded-lg bg-neutral-100 dark:bg-neutral-800">
                                <div className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                                    Total Storage
                                </div>
                                <div className="text-2xl font-bold">24 TB</div>
                            </div>
                            <div className="p-4 rounded-lg bg-neutral-100 dark:bg-neutral-800">
                                <div className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                                    Active Services
                                </div>
                                <div className="text-2xl font-bold">15/16</div>
                            </div>
                            <div className="p-4 rounded-lg bg-neutral-100 dark:bg-neutral-800">
                                <div className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                                    System Uptime
                                </div>
                                <div className="text-2xl font-bold">45 days</div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </PageContainer>
    );
}
