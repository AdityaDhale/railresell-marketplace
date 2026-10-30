const STORAGE_KEY = "railresell_tickets";

const defaultTickets = [
  {
    id: 1,
    from: "Mumbai",
    to: "Delhi",
    trainName: "Rajdhani Express",
    coach: "AC 2 Tier / A1",
    seatNumber: "12 / A1-12",
    departureDate: "2026-10-31",
    departureTime: "19:45",
    originalPrice: 1500,
    salePrice: 1299,
    notes: "Seat confirmed, valid for same date travel.",
    image:
      "https://images.unsplash.com/photo-1517849845537-4d2579024540?auto=format&fit=crop&w=900&q=80",
    status: "available"
  },
  {
    id: 2,
    from: "Pune",
    to: "Jaipur",
    trainName: "Maharashtra Express",
    coach: "Sleeper / S2",
    seatNumber: "18 / S2-18",
    departureDate: "2026-11-02",
    departureTime: "08:10",
    originalPrice: 980,
    salePrice: 760,
    notes: "Good for one passenger, travel is same day.",
    image:
      "https://images.unsplash.com/photo-1514565131-fce0801e5f4d?auto=format&fit=crop&w=900&q=80",
    status: "available"
  },
  {
    id: 3,
    from: "Bengaluru",
    to: "Hyderabad",
    trainName: "Duronto Express",
    coach: "Chair Car / C3",
    seatNumber: "9 / C3-09",
    departureDate: "2026-11-04",
    departureTime: "21:30",
    originalPrice: 1200,
    salePrice: 1200,
    notes: "Selling at same value, no discount.",
    image:
      "https://images.unsplash.com/photo-1500530855697-7d4a6d5330f0?auto=format&fit=crop&w=900&q=80",
    status: "available"
  }
];

function getTickets() {
  const storageData = localStorage.getItem(STORAGE_KEY);
  if (!storageData) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultTickets));
    return [...defaultTickets];
  }
  return JSON.parse(storageData);
}

function saveTickets(tickets) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tickets));
}

function formatCurrency(value) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(value);
}

function renderTickets() {
  const tickets = getTickets();
  const searchValue = document.getElementById("searchInput").value.trim().toLowerCase();

  const filtered = tickets.filter((ticket) => {
    const searchableText = `${ticket.from} ${ticket.to} ${ticket.trainName} ${ticket.coach}`.toLowerCase();
    return searchableText.includes(searchValue);
  });

  const grid = document.getElementById("ticketsGrid");
  if (!filtered.length) {
    grid.innerHTML = `
      <div class="ticket-card" style="grid-column: 1 / -1; padding: 24px;">
        <h3>No tickets found</h3>
        <p style="color: #667085; margin: 0;">Try another route or train name.</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered
    .map((ticket) => {
      const isSold = ticket.status === "sold";
      const badgeClass = isSold ? "sold" : "available";

      return `
        <article class="ticket-card">
          <div class="ticket-image">
            <img src="${ticket.image}" alt="${ticket.trainName}" />
          </div>

          <div class="ticket-card-body">
            <div class="ticket-header">
              <h3>${ticket.trainName}</h3>
              <span class="badge ${badgeClass}">${isSold ? "Sold" : "Available"}</span>
            </div>

            <div class="route-label">
              <span>${ticket.from}</span>
              <span class="route-arrow-mini">→</span>
              <span>${ticket.to}</span>
            </div>

            <div class="meta-grid">
              <div class="meta-box">
                <small>Date</small>
                <strong>${ticket.departureDate}</strong>
              </div>
              <div class="meta-box">
                <small>Time</small>
                <strong>${ticket.departureTime}</strong>
              </div>
              <div class="meta-box">
                <small>Coach</small>
                <strong>${ticket.coach}</strong>
              </div>
              <div class="meta-box">
                <small>Seat</small>
                <strong>${ticket.seatNumber}</strong>
              </div>
            </div>

            <div class="price-row">
              <div>
                <span class="price-original">${formatCurrency(ticket.originalPrice)}</span>
              </div>
              <div class="price-selling">${formatCurrency(ticket.salePrice)}</div>
            </div>

            <button
              class="ticket-button ${isSold ? "sold" : ""}"
              data-id="${ticket.id}"
              ${isSold ? "disabled" : ""}
            >
              ${isSold ? "Sold Out" : "Buy Now"}
            </button>
          </div>
        </article>
      `;
    })
    .join("");
}

function handleTicketSubmit(event) {
  event.preventDefault();

  const from = document.getElementById("fromCity").value.trim();
  const to = document.getElementById("toCity").value.trim();
  const trainName = document.getElementById("trainName").value.trim();
  const coach = document.getElementById("coach").value.trim();
  const departureDate = document.getElementById("departureDate").value;
  const departureTime = document.getElementById("departureTime").value;
  const originalPrice = Number(document.getElementById("originalPrice").value);
  const salePrice = Number(document.getElementById("salePrice").value);
  const seatNumber = document.getElementById("seatNumber").value.trim();
  const notes = document.getElementById("ticketNotes").value.trim();

  if (salePrice > originalPrice) {
    const formMessage = document.getElementById("formMessage");
    formMessage.textContent = "Selling price cannot be greater than the original price.";
    formMessage.style.color = "#ef4444";
    return;
  }

  const imageFile = document.getElementById("ticketImage").files[0];
  const image =
    imageFile && imageFile.type.startsWith("image/")
      ? URL.createObjectURL(imageFile)
      : "https://images.unsplash.com/photo-1500530855697-7d4a6d5330f0?auto=format&fit=crop&w=900&q=80";

  const tickets = getTickets();
  const newTicket = {
    id: Date.now(),
    from,
    to,
    trainName,
    coach,
    seatNumber,
    departureDate,
    departureTime,
    originalPrice,
    salePrice,
    notes: notes || "Ticket available for resale.",
    image,
    status: "available"
  };

  tickets.unshift(newTicket);
  saveTickets(tickets);

  const form = document.getElementById("ticketForm");
  form.reset();
  document.getElementById("previewImage").src =
    "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80";

  const message = document.getElementById("formMessage");
  message.textContent = "Ticket published successfully!";
  message.style.color = "#22b573";

  renderTickets();
}

function handleBuy(event) {
  const button = event.target.closest(".ticket-button");
  if (!button || button.disabled) return;

  const id = Number(button.dataset.id);
  const tickets = getTickets();

  const ticket = tickets.find((item) => item.id === id);
  if (!ticket) return;

  const confirmBuy = window.confirm(
    `Do you want to buy this ticket from ${ticket.from} to ${ticket.to} for ${formatCurrency(ticket.salePrice)}?`
  );

  if (!confirmBuy) return;

  const updated = tickets.map((item) => {
    if (item.id === id) {
      return { ...item, status: "sold" };
    }
    return item;
  });

  saveTickets(updated);
  renderTickets();
}

function handleImagePreview() {
  const file = document.getElementById("ticketImage").files[0];
  if (!file || !file.type.startsWith("image/")) return;

  const reader = new FileReader();
  reader.onload = (event) => {
    document.getElementById("previewImage").src = event.target.result;
  };
  reader.readAsDataURL(file);
}

document.getElementById("ticketForm").addEventListener("submit", handleTicketSubmit);
document.getElementById("ticketsGrid").addEventListener("click", handleBuy);
document.getElementById("searchInput").addEventListener("input", renderTickets);
document.getElementById("ticketImage").addEventListener("change", handleImagePreview);

renderTickets();
