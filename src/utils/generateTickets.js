import { faker } from '@faker-js/faker';

export const generateTickets = (count = 5) => {
  return Array.from({ length: count }, () => generateTicket());
};

const generateTicket = () => {
  return {
    price: faker.number.int({ min: 5000, max: 20000 }),
    carrier: faker.string.alpha({ length: 2, casing: 'upper' }),
    segments: [generateSegment(), generateSegment()],
  };
};

const generateSegment = () => {
  const departureTime = faker.date.recent();
  const returnTime = new Date(
    departureTime.getTime() +
      faker.number.int({ min: 5, max: 12 }) * 60 * 60 * 1000,
  );

  return {
    origin: faker.location.city(),
    destination: faker.location.city(),
    date: `${formatTime(departureTime)}-${formatTime(returnTime)}`,
    stops: Array.from({ length: faker.number.int({ min: 0, max: 3 }) }, () =>
      faker.location.city(),
    ),
    duration: `${faker.number.int({ min: 1, max: 12 })}h ${faker.number.int({
      min: 0,
      max: 59,
    })}m`,
  };
};

const formatTime = (date) => {
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
};
