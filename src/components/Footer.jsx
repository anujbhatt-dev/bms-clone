const sections = [
  {
    title: "MOVIES NOW SHOWING IN DEHRADUN",
    items: [
      "Mirzapur: The Movie",
      "Hanuman Ansh",
      "Toxic: A Fairy Tale for Grown-ups",
      "Spider-Man: Brand New Day",
      "Insidious: Out of The Further",
      "I'm Game",
      "Onslaught",
      "Jeevan Ya Bheema Con?",
    ],
  },
  {
    title: "UPCOMING MOVIES PER WEEK",
    items: [
      "Upcoming Movies Today",
      "Upcoming Movies Tomorrow",
      "Upcoming Movies This Weekend",
    ],
  },
  {
    title: "MOVIES BY GENRE",
    items: [
      "Thriller Movies",
      "Action Movies",
      "Crime Movies",
      "Adult Movies",
      "Adaptation Movies",
      "Heist Movies",
      "Musical Movies",
      "Horror Movies",
      "Mystery Movies",
      "War Movies",
    ],
  },
  {
    title: "MOVIES BY LANGUAGE",
    items: [
      "Movies in Hindi",
      "Movies in English",
      "Movies in Kannada",
      "Movies in Sindhi",
      "Movies in Bengali",
      "Movies in Flemish",
      "Movies in Chattisgarhi",
      "Movies in French",
      "Movies in Portuguese",
      "Movies in Magahi",
    ],
  },
  // {
  //   title: "SPORTS EVENTS IN DEHRADUN",
  //   items: [
  //     "Bowling",
  //     "Mixed Martial Arts",
  //     "Basketball",
  //     "Cricket",
  //     "Horse Race",
  //     "Sailing",
  //     "Chess",
  //     "Cycling",
  //     "E Sports",
  //     "Weight Lifting",
  //   ],
  // },
  // {
  //   title: "EVENTS IN TOP CITIES",
  //   items: [
  //     "Events in Mumbai",
  //     "Events in Delhi-NCR",
  //     "Events in Chennai",
  //     "Events in Bengaluru",
  //     "Events in Hyderabad",
  //     "Events in Pune",
  //     "Events in Ahmedabad",
  //     "Events in Kolkata",
  //     "Events in Kochi",
  //   ],
  // },
  // {
  //   title: "CINEMAS IN TOP CITIES",
  //   items: [
  //     "Cinemas in Mumbai",
  //     "Cinemas in Delhi-NCR",
  //     "Cinemas in Chennai",
  //     "Cinemas in Bengaluru",
  //     "Cinemas in Hyderabad",
  //     "Cinemas in Pune",
  //     "Cinemas in Ahmedabad",
  //     "Cinemas in Kolkata",
  //     "Cinemas in Kochi",
  //   ],
  // },
  // {
  //   title: "PLAYS IN TOP CITIES",
  //   items: [
  //     "Plays in Mumbai",
  //     "Plays in Delhi-NCR",
  //     "Plays in Chennai",
  //     "Plays in Bengaluru",
  //     "Plays in Hyderabad",
  //     "Plays in Pune",
  //     "Plays in Ahmedabad",
  //     "Plays in Kolkata",
  //     "Plays in Kochi",
  //   ],
  // },
  // {
  //   title: "ACTIVITIES IN TOP CITIES",
  //   items: [
  //     "Activities in Mumbai",
  //     "Activities in Delhi-NCR",
  //     "Activities in Chennai",
  //     "Activities in Bengaluru",
  //     "Activities in Hyderabad",
  //     "Activities in Pune",
  //     "Activities in Ahmedabad",
  //     "Activities in Kolkata",
  //     "Activities in Kochi",
  //   ],
  // },
  // {
  //   title: "MOVIES NOW SHOWING",
  //   items: [
  //     "Mirzapur: The Movie",
  //     "Hanuman Ansh",
  //     "Toxic: A Fairy Tale for Grown-ups",
  //     "Irumudi",
  //     "Mandaadi",
  //     "Sardar 2",
  //     "Adventure of Jetcat 7D - Combo",
  //     "Roller Coaster 7D - Combo",
  //     "Adventure of Iceberg 7D - Combo",
  //     "Romanchakam",
  //   ],
  // },
];

export default function Footer() {
  return (
    <div className="bg-[#333333] min-h-screen px-4 py-2 sm:px-30 text-white">
        <div className="flex flex-col sm:flex-row justify-between items-center py-4">
            <div className="flex flex-col sm:flex-row gap-3 items-center  text-center sm:text-left">
              <img src="/hut.svg" alt="" />
              <p className="font-bold">List your Show</p>
              <p className="font-thin">Got a show, event, activity or a great experience? Partner with us & get listed on BookMyShow</p>
            </div>
            <button className="bg-btn-primary p-4 px-6 rounded-lg my-4">
                Contact today
            </button>
        </div>
        <div className="bg-[#404040] py-4 flex justify-around items-center w-screen relative -left-4 sm:-left-30">
          <div className="flex flex-col items-center gap-1  transition duration-100 opacity-60 grow hover:opacity-100">
              <img className="h-12 w-auto" src="/cc.svg" alt="" />
              <p className="text-[10px]">24/7 CUSTOMER CARE</p>
          </div>
         <div className="flex flex-col items-center gap-1  transition duration-100 opacity-60 grow hover:opacity-100">
              <img className="h-12 w-auto" src="/ticket.svg" alt="" />
              <p className="text-[10px]">24/7 CUSTOMER CARE</p>
          </div><div className="flex flex-col items-center gap-1  transition duration-100 opacity-60 grow hover:opacity-100">
              <img className="h-12 w-auto" src="/mail.svg" alt="" />
              <p className="text-[10px]">24/7 CUSTOMER CARE</p>
          </div>
        </div>
        <div className="py-10">
          {sections.map((section) => (
            <section key={section.title} className="mb-6">
              <h3 className="mb-4 text-[11px] font-normal text-white transition duration-100 opacity-30 hover:opacity-100">
                {section.title}
              </h3>

              <div className="flex flex-wrap items-center gap-y-2">
                {section.items.map((item, index) => (
                  <div key={item} className="flex items-center">
                    <a
                      href="#"
                      className="text-[10px] transition duration-100 opacity-30 hover:opacity-100"
                    >
                      {item}
                    </a>

                    {index !== section.items.length - 1 && (
                      <span className="mx-2 text-white opacity-30">|</span>
                    )}
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
    </div>
  )
}
