import { BASE_API_URL } from "@/common/Constants";
import axios from "axios";
import { authHeader } from "./BaseService";

const API_URL  = BASE_API_URL + '/api/restaurant';

class RestaurantService {


    save(restaurant, restaurantImage){
        let formData = new FormData();
        formData.append("restaurantImage", restaurantImage);
        formData.append("restaurant", JSON.stringify(restaurant));

        return axios.post(API_URL + '/save', formData, {headers: authHeader()});
    }


    findall(){
        return axios.get(API_URL + '/findall');
    }

    delete(){
        return null;
    }

    edit(){
        return null;
    }
  
}

export default new RestaurantService();