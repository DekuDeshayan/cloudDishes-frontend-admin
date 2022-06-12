import { BASE_API_URL } from "@/common/Constants";
import axios from "axios";
import { authHeader } from "./BaseService";

const API_URL  = BASE_API_URL + '/api/meal';

class MealService {

    save(meal, mealImage){

        let formData = new FormData();
        formData.append("mealImage", mealImage);
        formData.append("meal", JSON.stringify(meal));

        return axios.post(API_URL + '/save', formData, {headers: authHeader()});
    }


    findAllByRestaurant(rest_id){
        return axios.get(API_URL + '/retrieve-meal-by-rest/'+rest_id);
    }


    delete(){
        return null;
    }

    edit(){
        return null;
    }
  
}

export default new MealService();