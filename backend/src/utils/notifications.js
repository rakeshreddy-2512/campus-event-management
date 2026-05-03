import nodemailer from 'nodemailer';
import User from '../models/User.js';

const transporter = nodemailer.createTransport({
  jsonTransport: true
});

export const createNotification = async ({ userId, title, message }) => {
  await User.findByIdAndUpdate(userId, {
    $push: { notifications: { title, message } }
  });
};

export const sendEmailNotification = async ({ to, subject, message }) =>
  transporter.sendMail({
    from: 'no-reply@campusevents.local',
    to,
    subject,
    text: message
  });
