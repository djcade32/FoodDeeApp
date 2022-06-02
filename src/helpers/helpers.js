import {
  Entypo,
  MaterialIcons,
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

export function getCuisine(categoryList) {
  let category = "";
  for (let i = 0; i < categoryList.length; i++) {
    if (categoryList[i].title.includes("American")) {
      i = categoryList.length;
      return "American";
    }
    switch (categoryList[i].title) {
      case "Italian":
        i = categoryList.length;
        category = "Italian";
        break;
      case "Pizza":
        i = categoryList.length;
        category = "Italian";
        break;

      case "Mexican":
        i = categoryList.length;
        category = "Mexican";
        break;
      case "Tacos":
        i = categoryList.length;
        category = "Mexican";
        break;

      case "Bakeries":
        i = categoryList.length;
        category = "Bakery";
        break;

      case "Mediterranean":
        i = categoryList.length;
        category = "Mediterranean";
        break;
      case "Middle Eastern":
        i = categoryList.length;
        category = "Mediterranean";
        break;

      case "Cafes":
        i = categoryList.length;
        category = "Cafe";
        break;
      case "Coffee & Tea":
        i = categoryList.length;
        category = "Cafe";
        break;

      case "Southern":
        i = categoryList.length;
        category = "American";
        break;

      case "Bars":
        i = categoryList.length;
        category = "American";
        break;

      case "Burgers":
        i = categoryList.length;
        category = "American";
        break;

      case "American":
        i = categoryList.length;
        category = "American";
        break;
      case "Barbeque":
        i = categoryList.length;
        category = "American";
        break;
      case "Fast Food":
        i = categoryList.length;
        category = "American";
        break;
      case "Restaurants":
        i = categoryList.length;
        category = "American";
        break;

      case "Sandwiches":
        i = categoryList.length;
        category = "American";
        break;

      case "Fish & Chips":
        i = categoryList.length;
        category = "American";
        break;

      case "Chinese":
        i = categoryList.length;
        category = "Chinese";
        break;

      case "French":
        i = categoryList.length;
        category = "French";
        break;
      case "Crepes":
        i = categoryList.length;
        category = "French";
        break;

      case "Japanese":
        i = categoryList.length;
        category = "Japanese";
        break;
      case "Sushi Bars":
        i = categoryList.length;
        category = "Japanese";
        break;

      case "Thai":
        i = categoryList.length;
        category = "Thai";
        break;

      case "German":
        i = categoryList.length;
        category = "German";
        break;

      case "Vietnamese" || "Bubble Tea":
        i = categoryList.length;
        category = "Vietnamese";
        break;

      case "Irish":
        i = categoryList.length;
        category = "Irish";
        break;

      default:
        category = categoryList[i].title;
        break;
    }
  }

  return category;
}

export function getCuisineIcon(categoryList) {
  let icon = null;
  switch (getCuisine(categoryList)) {
    case "American":
      icon = <FontAwesome5 name="hamburger" size={24} color="white" />;
      break;
    case "Cafe":
      icon = <Ionicons name="cafe" size={24} color="white" />;
      break;
    case "Italian":
      icon = <Ionicons name="pizza" size={24} color="white" />;
      break;
    case "Japanese":
      icon = <MaterialCommunityIcons name="rice" size={24} color="white" />;
      break;
    case "Mexican":
      icon = <MaterialCommunityIcons name="taco" size={24} color="white" />;
      break;
    case "Bakery":
      icon = <MaterialIcons name="bakery-dining" size={24} color="white" />;
      break;
    case "French":
      icon = <MaterialCommunityIcons name="snail" size={24} color="white" />;
      break;
    case "German":
      icon = <MaterialCommunityIcons name="pretzel" size={24} color="white" />;
      break;
    case "Irish":
      icon = <MaterialCommunityIcons name="clover" size={24} color="white" />;
      break;
    case "Chinese":
      icon = <MaterialIcons name="rice-bowl" size={24} color="white" />;
      break;
    case "Vietnamese":
      icon = <MaterialCommunityIcons name="noodles" size={24} color="white" />;
      break;

    default:
      icon = (
        <MaterialCommunityIcons
          name="silverware-fork-knife"
          size={24}
          color="white"
        />
      );
      break;
  }
  return icon;
}

export function getApiCategory(cuisine) {
  switch (cuisine) {
    case "American":
      return "newamerican, tradamerican, southern, burgers, barbeque, hotdogs, sandwiches, fishnchips";
    case "Bakery":
      return "bakeries";
    case "Cafe":
      return "cafes, coffee";
    case "German":
      return "german";
    case "Italian":
      return "italian, pizza";
    case "Mexican":
      return "mexican, tacos";
    case "Mediterranean":
      return "mediterranean, mideastern, lebanese, egyptian";
    case "Chinese":
      return "chinese";
    case "Japanese":
      return "japanese, conveyorsushi, sushi";
    case "Thai":
      return "thai";
    case "Vietnamese":
      return "vietnamese, bubbletea";
    case "Irish":
      return "irish, irish_pubs";
    default:
      break;
  }
}

export function calculateDistance(lat1, lat2, lon1, lon2) {
  // The math module contains a function
  // named toRadians which converts from
  // degrees to radians.
  lon1 = (lon1 * Math.PI) / 180;
  lon2 = (lon2 * Math.PI) / 180;
  lat1 = (lat1 * Math.PI) / 180;
  lat2 = (lat2 * Math.PI) / 180;

  // Haversine formula
  let dlon = lon2 - lon1;
  let dlat = lat2 - lat1;
  let a =
    Math.pow(Math.sin(dlat / 2), 2) +
    Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(dlon / 2), 2);

  let c = 2 * Math.asin(Math.sqrt(a));

  // Radius of earth in kilometers. Use 3956
  // for miles
  let r = 6371;

  // calculate the result
  return c * r;
}
