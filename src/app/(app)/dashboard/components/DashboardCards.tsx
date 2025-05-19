import { Card } from "@/components/ui/card";
import { Bell, FileText, Settings, Users } from "lucide-react";
import Link from "next/link";

const dashboardItems = [
    {
        title: 'Notifications',
        description: 'Check your latest notifications',
        icon: <Bell className="h-6 w-6" />,
        href: '/notifications',
        color: 'bg-blue-100'
    },
    {
        title: 'Documents',
        description: 'Access your documents',
        icon: <FileText className="h-6 w-6" />,
        href: '/documents',
        color: 'bg-green-100'
    },
    {
        title: 'Users',
        description: 'Manage user accounts',
        icon: <Users className="h-6 w-6" />,
        href: '/users',
        color: 'bg-purple-100'
    },
    {
        title: 'Settings',
        description: 'Configure your preferences',
        icon: <Settings className="h-6 w-6" />,
        href: '/settings',
        color: 'bg-orange-100'
    },
];

export function DashboardCards() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dashboardItems.map((item) => (
                <Link href={item.href} key={item.title}>
                    <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
                        <div className="flex items-start space-x-4">
                            <div className={`p-3 rounded-lg ${item.color}`}>
                                {item.icon}
                            </div>
                            <div>
                                <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
                                <p className="text-gray-600">{item.description}</p>
                            </div>
                        </div>
                    </Card>
                </Link>
            ))}
        </div>
    );
} 