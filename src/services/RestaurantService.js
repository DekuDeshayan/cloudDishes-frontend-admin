import { BASE_API_URL } from "@/common/Constants";
import axios from "axios";
import { authHeader } from "./BaseService";

const API_URL  = BASE_API_URL + '/api/restaurant';

class RestaurantService {

    save(Restaurant){
        return axios.post(API_URL + '/save', Restaurant, {headers: authHeader()});
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