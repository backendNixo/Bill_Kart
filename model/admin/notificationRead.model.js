import mongoose, { mongo } from "mongoose";

const notificationReadSchema = new mongoose.Schema({
    notificationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Notification",
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    isSeen: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

const NotificationRead = mongoose.model("NotificationRead", notificationReadSchema);

export default NotificationRead;