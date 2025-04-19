import { COLORS } from "@/lib/time-converter-constants";

interface NotificationProps {
  notification: {
    show: boolean;
    message: string;
    type: string;
  };
}

export default function Notification({ notification }: NotificationProps) {
  if (!notification.show) return null;

  return (
    <div
      className="fixed top-16 right-[50%] px-3 py-2 rounded-md shadow-lg text-white text-sm max-w-[90%] sm:max-w-md z-50"
      style={{
        backgroundColor:
          notification.type === "error"
            ? COLORS.error
            : notification.type === "info"
            ? COLORS.primary
            : COLORS.success,
      }}
    >
      {notification.message}
    </div>
  );
}
