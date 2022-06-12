import { BASE_API_URL } from "@/common/Constants";
import axios from "axios";
import { authHeader } from "./BaseService";

const API_URL  = BASE_API_URL + '/api/order';

class OrderService {

    findall(){
        return axios.get(API_URL + '/find-all-orders');
    }
 
}

export default new OrderService();