import QRCode from 'qrcode';
import Event from '../models/Event.js';
import Registration from '../models/Registration.js';
import { createNotification, sendEmailNotification } from '../utils/notifications.js';

export const registerForEvent = async (req, res) => {
  const { eventId } = req.params;
  const event = await Event.findById(eventId);
  if (!event) return res.status(404).json({ message: 'Event not found' });

  const current = await Registration.countDocuments({ event: eventId });
  if (current >= event.capacity) return res.status(400).json({ message: 'Event is full' });

  const ticketId = `TKT-${Date.now()}-${req.user._id}`;
  const qrPayload = JSON.stringify({ ticketId, eventId, userId: req.user._id });
  const qrCodeDataUrl = await QRCode.toDataURL(qrPayload);

  const registration = await Registration.create({
    event: eventId,
    user: req.user._id,
    ticketId,
    qrCodeDataUrl
  });

  await createNotification({
    userId: req.user._id,
    title: 'Registration Confirmed',
    message: `You are registered for ${event.title}. Ticket ID: ${ticketId}`
  });

  await sendEmailNotification({
    to: req.user.email,
    subject: `Ticket for ${event.title}`,
    message: `Registration successful. Ticket ID: ${ticketId}`
  });

  res.status(201).json(registration);
};

export const myRegistrations = async (req, res) => {
  const rows = await Registration.find({ user: req.user._id }).populate('event');
  res.json(rows);
};
