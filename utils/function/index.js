import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { Platform, Alert } from "react-native";
const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
];

export function __generateRandomString(length) {
    const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters.charAt(randomIndex);
    }

    return result;
}

export function __formatDate(date) {
    let inputDate = new Date(date);
    if (!(inputDate instanceof Date)) {
        throw new Error("Input must be a valid Date object");
    }

    const day = inputDate.getDate().toString().padStart(2, "0");

    const month = monthNames[inputDate.getMonth()];
    const year = inputDate.getFullYear();

    const formattedDate = `${day}-${month}-${year} `;

    return formattedDate;
}

export function __formatDate2(date) {
    let inputDate = new Date(date);
    if (!(inputDate instanceof Date)) {
        throw new Error("Input must be a valid Date object");
    }

    const day = inputDate.getDate().toString().padStart(2, "0");

    const month = monthNames[inputDate.getMonth()];
    const year = inputDate.getFullYear();
    const hours = inputDate.getHours() % 12 || 12;
    const minutes = inputDate.getMinutes().toString().padStart(2, "0");
    const ampm = inputDate.getHours() >= 12 ? "PM" : "AM";

    const formattedDate = `${day} ${month}, ${year} ${hours}:${minutes} ${ampm}`;

    return formattedDate;
}

export async function __registerForPushNotificationsAsync() {
    let token;
    try {
        let token;

        if (Platform.OS === "android") {
            await Notifications.setNotificationChannelAsync("default", {
                name: "default",
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: "#FF231F7C",
            });
        }

        if (Device.isDevice) {
            const { status: existingStatus } =
                await Notifications.getPermissionsAsync();
            let finalStatus = existingStatus;
            if (existingStatus !== "granted") {
                const { status } =
                    await Notifications.requestPermissionsAsync();
                finalStatus = status;
            }
            if (finalStatus !== "granted") {
                return;
            }
            token = (await Notifications.getDevicePushTokenAsync()).data;
        } else {
        }

        return token;
    } catch (error) {
        return token;
    }
}
export async function __schedulePushNotification(title, body, data = {}) {
    try {
        await Notifications.scheduleNotificationAsync({
            content: {
                title: title,
                body: body,
                data: data,
            },
            trigger: { seconds: 1 },
        });
    } catch (error) {}
}

export function __setColor(status) {
    if (status === "Completed" || status === "Task Completed") {
        return "#34c38f";
    } else if (status === "Pending" || status === "Pending for payment") {
        return "#f1b44c";
    } else if (status === "Accepted") {
        return "#50a5f1";
    } else if (status === "Rejected" || status === "Expired") {
        return "#f46a6a";
    } else if (status === "Not Accepted") {
        return "#f46a6a";
    }
}

export function __getCurrentFinancialYear() {
    const today = new Date();
    const currentYear = today.getFullYear();
    const fiscalStartMonth = 4;

    if (today.getMonth() + 1 < fiscalStartMonth) {
        return currentYear - 1;
    } else {
        return currentYear;
    }
}
