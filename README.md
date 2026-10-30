# RailResell

A modern train ticket resale marketplace where users can upload unused train tickets and other travelers can buy them at a lower or equal resale price.

## Features

- Sell unused train tickets by uploading ticket details
- Browse available tickets from other travelers
- Search by route or train name
- Upload a ticket image for verification
- Prevent resale above original price
- Buy tickets directly from the marketplace
- Dark premium UI with a modern dashboard look
- Local browser storage for demo usage

## Tech Stack

- HTML
- CSS
- JavaScript

## Project Structure

```text
railresell-marketplace/
├── index.html
├── style.css
├── script.js
├── README.md
├── .gitignore
└── LICENSE
```

## Running the Project

1. Clone the repository:

```bash
git clone https://github.com/AdityaDhale/railresell-marketplace.git
```

2. Open the project folder:

```bash
cd railresell-marketplace
```

3. Open `index.html` in a browser.

You can also run a simple local server if preferred:

```bash
python -m http.server 8000
```

Then visit:

```text
http://localhost:8000
```

## How It Works

### Selling a Ticket

- Fill in your route, train details, original price, and resale price
- Upload a ticket image if available
- Publish the ticket to the marketplace

### Buying a Ticket

- Browse the ticket listings
- Search by route or train name
- Click `Buy Now` to purchase the ticket from the marketplace

## Notes

This project is currently a frontend demo and uses browser `localStorage` to save ticket data. It is ideal for showcasing the marketplace concept and can later be extended with a backend, authentication, and real payment integration.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

## Future Enhancements

- Real backend with database
- User authentication
- Razorpay or Stripe payment integration
- Ticket verification process
- Seller dashboard and admin panel
- Real-time notifications

## Contributing

Contributions are welcome. Feel free to fork the repository and submit pull requests.

## Author

Aditya Dhale
