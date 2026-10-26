
const events = [
  {
    id: 1,
    name: "Music Festival",
    date: "2026-11-15",
    venue: "Chennai",
    price: 799,
    available: 50,
    emoji: "🎵"
  },
  {
    id: 2,
    name: "Technology Conference",
    date: "2026-11-20",
    venue: "Bengaluru",
    price: 499,
    available: 40,
    emoji: "💻"
  },
  {
    id: 3,
    name: "Startup Meetup",
    date: "2026-11-25",
    venue: "Chennai",
    price: 299,
    available: 30,
    emoji: "🚀"
  }
];

const bookings = [];

function displayEvents() {
  const container = document.getElementById("eventContainer");

  container.innerHTML = events.map(event => `
    <div class="event-card">
      <div class="emoji">${event.emoji}</div>
      <h3>${event.name}</h3>
      <p>📅 ${event.date}</p>
      <p>📍 ${event.venue}</p>
      <p>🎟️ ₹${event.price} per ticket</p>
      <p>Available: ${event.available}</p>
      <button onclick="bookTicket(${event.id})"
        ${event.available === 0 ? "disabled" : ""}>
        Book Ticket
      </button>
    </div>
  `).join("");
}

function bookTicket(id) {
  const event = events.find(item => item.id === id);

  if (!event || event.available < 1) {
    alert("Sorry, no tickets are available.");
    return;
  }

  const quantity = Number(
    prompt("Enter number of tickets (1–5):")
  );

  if (!Number.isInteger(quantity) || quantity < 1 || quantity > 5) {
    alert("Please enter a valid quantity between 1 and 5.");
    return;
  }

  if (quantity > event.available) {
    alert("Not enough tickets available.");
    return;
  }

  const confirmed = confirm(
    `Event: ${event.name}\n` +
    `Tickets: ${quantity}\n` +
    `Total: ₹${event.price * quantity}\n\n` +
    `Confirm simulated booking?`
  );

  if (!confirmed) return;

  event.available -= quantity;

  bookings.push({
    name: event.name,
    quantity,
    total: event.price * quantity,
    reference: "EVT" + Date.now()
  });

  displayEvents();
  displayBookings();

  alert("Booking successful! This is a demo, not a real payment.");
}

function displayBookings() {
  const list = document.getElementById("bookingList");

  if (bookings.length === 0) {
    list.textContent = "No bookings yet.";
    return;
  }

  list.innerHTML = bookings.map(booking => `
    <div class="booking-item">
      <h3>${booking.name}</h3>
      <p>Tickets: ${booking.quantity}</p>
      <p>Total: ₹${booking.total}</p>
      <p>Reference: ${booking.reference}</p>
      <p>Status: Demo booking confirmed</p>
    </div>
  `).join("");
}

displayEvents();
displayBookings();
