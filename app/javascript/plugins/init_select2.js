import $ from 'jquery';
import 'select2';

const cities = ["Los Angeles", "Hong Kong", "Amsterdam", "Bali", "Barcelona", "Belo Horizonte", "Berlin", "Bordeaux", "Brussels", "Buenos Aires", "Casablanca", "Chengdu", "Copenhagen", "Kyoto", "Iceland", "Lausanne", "Lille", "Lisbon", "London", "Lyon", "Marseille", "Melbourne", "Mexico", "Milan", "Montréal", "Nantes", "Paris", "Rio de Janeiro", "São Paulo", "Shanghai", "Shenzhen", "Tel Aviv", "Tokyo"];

const initSelect2 = () => {
  $('#city-input').select2({
    // Select from a list of cities from line4:
    data: cities,
    width: '100%'
  });
  console.log("welcome to select2");
};

export { initSelect2 };
