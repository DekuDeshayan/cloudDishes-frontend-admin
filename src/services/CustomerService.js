import { BASE_API_URL } from "@/common/Constants";
import axios from "axios";
import { authHeader } from "./BaseService";

const API_URL  = BASE_API_URL + '/api/client';

class CustomerService {
    findall(){
        return axios.get(API_URL + '/findall');
    }

    ban(){
        return null;
    }
}

export default new CustomerService();

