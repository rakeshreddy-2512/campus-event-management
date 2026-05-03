import Event from '../models/Event.js';
import Registration from '../models/Registration.js';

export const getEvents = async (_req, res) => {
  const events = await Event.find().sort({ startDate: 1 }).populate('createdBy', 'name');
  res.json(events);
};

export const createEvent = async (req, res) => {
  const event = await Event.create({ ...req.body, createdBy: req.user._id });
  res.status(201).json(event);
};

export const getEventAnalytics = async (req, res) => {
  const events = await Event.find();
  const registrations = await Registration.find();

  const totalEvents = events.length;
  const totalRegistrations = registrations.length;
  const capacityUsage = events.map((event) => {
    const registered = registrations.filter((r) => r.event.toString() === event._id.toString()).length;
    return {
      event: event.title,
      registered,
      capacity: event.capacity,
      occupancy: Number(((registered / event.capacity) * 100 || 0).toFixed(1))
    };
  });

  res.json({ totalEvents, totalRegistrations, capacityUsage });
};
