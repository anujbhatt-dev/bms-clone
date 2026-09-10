export const offers = [
  "Flat 20% off up to ₹100 on ticket bookings with HDFC Bank Credit Cards",
  "Get Buy 1 Get 1 Free on movie tickets using ICICI Bank Debit Cards",
  "Flat ₹75 off on your first booking with the app — use code FIRST75",
  "Pay via Paytm Wallet and get 15% cashback up to ₹120",
  "SBI Card users get flat 10% instant discount on weekend shows",
  "Book 3 tickets and get the 4th one absolutely free every Tuesday",
  "Flat ₹50 off on food & beverages combo with any ticket purchase",
  "Axis Bank Credit Card holders enjoy 25% off up to ₹150 on bookings",
  "Refer a friend and both of you get ₹100 off your next booking",
  "Student ID holders get a flat 15% discount on weekday shows",
];

export const seats = generateSeats();

function generateSeats() {
  const rowLetters = 'ABCDEFGH'.split('');
  const seatsPerRow = 12;
  const seats = [];

  rowLetters.forEach((row, rowIndex) => {
    for (let num = 1; num <= seatsPerRow; num++) {
      let type, price;
      if (rowIndex < 2) {
        type = 'economy';       // front rows - closest to screen
        price = 150;
      } else if (rowIndex < 6) {
        type = 'regular';       // middle rows - best viewing angle
        price = 200;
      } else {
        type = 'premium';       // back rows - recliners/best seats
        price = 350;
      }

      seats.push({
        id: `${row}${num}`,
        row,
        number: num,
        type,
        price,
        isBooked: false,
      });
    }
  });

  return seats;
}

export function getSeatPrice(seatId) {
  const seat = seats.find(s => s.id === seatId);
  return seat ? seat.price : null;
}