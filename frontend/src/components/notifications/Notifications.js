import React, { useEffect, useState } from "react";
import style from "./style/Notifications.module.css";
import Notification from "./Notification";
import useFetchWrapper from "../../utils/fetchWrapper";
import Loading from "../../common/loading/Loading";

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchFunction = useFetchWrapper();

  const markNotificatinsAsSeen = async () => {
    try {
      const response = await fetchFunction({
        url: "/api/notifications/markAsSeen",
        method: "post",
      });
    } catch (error) {}
  };

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetchFunction({ url: "/api/notifications/get" });

        const data = await response.json();
        setNotifications(data.results);
        setLoading(false);
        setTimeout(() => {
          markNotificatinsAsSeen();
        }, 1000);
      } catch (error) {}
    };

    if (loading) {
      fetchNotifications();
    }
  }, [notifications, loading]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className={style.notificationsContainer}>
      {notifications.length === 0 && !loading ? (
        <>
          <div className="text-center py-4">
            <span className="noDataMessage">
              No notifications
            </span>
          </div>
        </>
      ) : (
        <>
          {notifications.map((value, index) => {
            return (
              <Notification
                key={index}
                seen={value.seen}
                body={value.message}
              />
            );
          })}
        </>
      )}
    </div>
  );
}
