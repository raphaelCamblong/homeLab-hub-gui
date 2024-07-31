"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import useNotification from "@/services/notification/useNotification";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Notification as NotificationType } from "@/services/store/notificationStore";
import { Terminal, Trash } from "lucide-react";

interface NotifactionProps {
  item: NotificationType;
}

const Notification: React.FC<NotifactionProps> = ({ item }) => {
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

interface NotifactionsProps {
  name: string;
}
const Notifactions: React.FC<NotifactionsProps> = ({ name }) => {
  const { notifications, pushNotification, clearNotifications } =
    useNotification();

  return (
    <div>
      <h1 className="font-ppneuemachina text-3xl">Notifactions</h1>
      <Button onClick={clearNotifications}> Clear all</Button>
      <div className="flex flex-col gap-2">
        {notifications.map((notification) => (
          <Notification key={notification.id} item={notification} />
        ))}
      </div>
    </div>
  );
};

export default Notifactions;
