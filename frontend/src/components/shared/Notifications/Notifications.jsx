import React, { useEffect, useState, useCallback } from 'react'
import NotificationButton from './NotificationButton'
import NotificationList from './NotificationList'
import { connectSocket, disconnectSocket, listenForNotifications, socket } from '@/lib/socketService';
import api from '@/lib/api';
import { toast } from 'sonner';
import { useSession } from '@/contexts/Session/SessionContext';

const Notifications = ({ isLoggedIn }) => {
    const { sessionData } = useSession()

    const [notifications, setNotifications] = useState([]);
    const [isOpen, setIsOpen] = useState(false)

    const fetchNotifications = useCallback(async () => {
        if (isLoggedIn) {
            try {
                const response = await api.get("/notifications", { withCredentials: true });
                setNotifications(response.data.notifications)

            } catch {
                console.error("Error fetching notifications")
                toast.error("Error fetching notifications")
            }

        }
    }, [isLoggedIn]);

    useEffect(() => {
        fetchNotifications();

    }, [fetchNotifications]);

    useEffect(() => {
        connectSocket();

        if (sessionData) {
            const { id, role } = sessionData;
            socket.emit("register", { id, role })
        }

        listenForNotifications((notification) => {
            setNotifications((prev) => [...prev, notification]);
        });

        return () => {
            disconnectSocket();
        };
    }, [sessionData])

    return (
        <>
            <div className='relative'>
                <NotificationButton setIsOpen={setIsOpen} notifications={notifications} />
                {isOpen && <NotificationList notifications={notifications} setNotifications={setNotifications} />}
            </div>
        </>
    )
}

export default Notifications;
