import { toast } from "sonner";
import useNotificationStore, { Notification } from "../store/notificationStore";

const useNotification = (): {
  notifications: Notification[];
  pushNotification: (notification: Notification) => void;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;
} => {
  const notifications = useNotificationStore((state) => state.notifications);

  const pushNotification = (notification: Notification) => {
    notification.id = String(Date.now());
    useNotificationStore.getState().addNotification(notification);
    toast(notification.type, {
      description: notification.message,
      action: {
        label: "Undo",
        onClick: () => console.log("Undo"),
      },
    });
  };

  const removeNotification = (id: string) => {
    useNotificationStore.getState().removeNotification(id);
  };

  const clearNotifications = () =>
    useNotificationStore.getState().clearNotifications();

  return {
    notifications,
    pushNotification,
    removeNotification,
    clearNotifications,
  };
};

export default useNotification;
