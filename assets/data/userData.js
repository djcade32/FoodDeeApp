const user = [
  {
    id: "1",
    name: "Norman Cade",
    birthday: "09/27/1996",
    favoriteCuisine: "Asian",
    lat: 38.8954745,
    lng: -77.012497,
    restaurants: [
      {
        id: "123",
        name: "Augie's",
        cuisine: "American",
        address: "906 S Washington St, Alexandria, Va",
        image: require("../images/restaurant-1.jpg"),
        cost: "$$",
        lat: 38.7354745,
        lng: -77.158497,
        status: "TRIED",
      },
      {
        id: "121",
        name: "STK",
        cuisine: "Steak house",
        address: "906 S Washington St, Alexandria, Va",
        image: require("../images/restaurant-2.jpg"),
        cost: "$$",
        lat: 38.7354745,
        lng: -77.158497,
        status: "TRIED",
      },
      {
        id: "122",
        name: "Tatte Bakery",
        cuisine: "Cafe",
        address: "906 S Washington St, Alexandria, Va",
        image: require("../images/restaurant-3.jpg"),
        cost: "$$",
        lat: 38.7354745,
        lng: -77.158497,
        status: "TRY",
      },
      {
        id: "124",
        name: "Mia's",
        cuisine: "Italian",
        address: "906 S Washington St, Alexandria, Va",
        image: require("../images/restaurant-4.jpg"),
        cost: "$$",
        lat: 38.7354745,
        lng: -77.158497,
        status: "TRY",
      },
    ],
    items: [
      {
        restaurantId: "122",
        itemName: "Sweet potato fries",
      },
      {
        restaurantId: "122",
        itemName: "Breakfast Sandwhich",
      },
      {
        restaurantId: "124",
        itemName: "Salmon pasta",
      },
    ],
  },
];

export default user;
