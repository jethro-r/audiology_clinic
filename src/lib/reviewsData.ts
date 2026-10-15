// Real Google reviews supplied by Paul (screenshots in sam/, Oct 2026).
// Text is verbatim from Google. Reviewers are shown as first name + initial
// for privacy. Dates are approximate months derived from the "X weeks ago"
// shown in the screenshots. To rotate reviews, edit this file only.

export interface Review {
  author: string;
  rating: number;
  date: string;
  text: string;
}

export const reviews: Review[] = [
  {
    author: "Robin M.",
    rating: 5,
    date: "March 2026",
    text: "Helped our 103yr old father hear properly again very glad awesome service and did everything at dads rest home and kept us informed all the way through the process will recommend Paul to everybody",
  },
  {
    author: "Courtney K.",
    rating: 5,
    date: "April 2026",
    text: "Amazing experience with Paul. He is not a patch and dispatch kind of guy, he is thorough, professional and communicates well. It's worth supporting his business and receiving the high level of knowledge, care and expertise. Highly recommend Veritas Hearing over any other audiologist in Hamilton.",
  },
  {
    author: "Ian",
    rating: 5,
    date: "July 2026",
    text: "My wife and I had Paul provide to each of us a full examination of our hearing using his audiology testing technology. Paul explained the tests he was doing and what results were normal for people of our age. My wife now feels much better from the daily exercises he recommended for her to do to clear the pressure imbalance in her ear. We appreciated his knowledge and professional manner.",
  },
  {
    author: "Junyi S.",
    rating: 5,
    date: "July 2026",
    text: "I was quite nervous before my appointment because I wasn't sure what to expect, but Paul immediately made me feel relaxed and comfortable. The clinic is clean, tidy, quiet, and offers a very private environment. Paul is professional, reliable, and knowledgeable, and he explained everything clearly throughout the appointment. After the treatment, my ears no longer felt blocked, and the difference was amazing. I'm really happy with the experience and would highly recommend Paul to anyone looking for professional ear care.",
  },
  {
    author: "Uyên P.",
    rating: 5,
    date: "August 2026",
    text: "Very happy with our appointment with Dr Paul. He is very gentle and professional and easy to work with from the start. Appointment can easily be booked on the website and he is also very accommodating to fit us in outside of the online schedule. The pricing is very reasonable and the location is quite central as well. Thank you very much. 😊",
  },
];

// Google Maps listing for Veritas Hearing (search URL is stable even if the
// share link changes). Opens the listing where all reviews live.
export const googleReviewsUrl =
  "https://www.google.com/maps/search/?api=1&query=Veritas+Hearing+37+Lake+Road+Frankton+Hamilton";
