import { Card } from "@/components/ui/card";

export function QuickStats() {
    return (
        <div className="mt-8">
            <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">Quick Stats</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                        <p className="text-gray-600">Total Documents</p>
                        <p className="text-2xl font-bold">24</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                        <p className="text-gray-600">Unread Notifications</p>
                        <p className="text-2xl font-bold">3</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                        <p className="text-gray-600">Active Users</p>
                        <p className="text-2xl font-bold">12</p>
                    </div>
                </div>
            </Card>
        </div>
    );
} 