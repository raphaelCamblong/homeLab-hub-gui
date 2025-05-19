"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { useNotification } from "@/lib/hooks/useNotification";
import { NotificationItem } from "./NotificationItem";

export const NotificationList: React.FC = () => {
    const { notifications, clearNotifications } = useNotification();

    return (
        <div className="w-full">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-3xl">Notifications</h1>
                <Button onClick={clearNotifications} variant="outline">
                    Clear all
                </Button>
            </div>
            <div className="flex flex-col gap-2">
                {notifications.map((notification) => (
                    <NotificationItem key={notification.id} item={notification} />
                ))}
            </div>
        </div>
    );
}; 