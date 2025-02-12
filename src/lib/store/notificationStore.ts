import {create} from 'zustand';

export interface Notification {
  id?: string;
  type: 'success' | 'error' | 'info' | 'warning';
  message: string
}

interface NotificationState {
  notifications: Notification[];
  addNotification: (notification: Notification) => void;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;
}

const useNotificationStore = create<NotificationState>((set) => ({
  notifications: [],
  addNotification: (notification: Notification) =>
    set((state) => ({ notifications: [...state.notifications, notification] })),
  removeNotification: (id: string) =>
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    })),
  clearNotifications: () => set({ notifications: [] }),
}));

export default useNotificationStore;
