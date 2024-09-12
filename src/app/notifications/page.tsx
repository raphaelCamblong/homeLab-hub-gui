"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import useNotification from "@/services/notification/useNotification";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Notification as NotificationType } from "@/services/store/notificationStore";
import { Terminal, Trash } from "lucide-react";

interface NotificationItemProps {
  item: NotificationType;
}

const NotificationItem: React.FC<NotificationItemProps> = ({ item }) => {
  const { removeNotification } = useNotification();
  const color = item.type === "success" ? "green-pastel" : "red-pastel";

  return (
    <Alert>
      <Terminal className="h-4 w-4" />
      <AlertTitle className={`text-${color} `}>
        {item.type} - {item.id}
      </AlertTitle>
      <AlertDescription>
        <div className="flex flex-row justify-between">
          {item.message}
          <Button onClick={() => removeNotification(item.id!)}>
            <Trash />
          </Button>
        </div>
      </AlertDescription>
    </Alert>
  );
};

interface NotificationProps {}

const Notification: React.FC<NotificationProps> = ({}) => {
  const { notifications, clearNotifications } = useNotification();

  return (
    <div className="w-full h-full">
      <h1 className="text-3xl">Notification</h1>
      <Button onClick={clearNotifications}> Clear all</Button>
      <div className="flex flex-col gap-2">
        {notifications.map((notification) => (
          <NotificationItem key={notification.id} item={notification} />
        ))}
      </div>
    </div>
  );
};

export default Notification;
