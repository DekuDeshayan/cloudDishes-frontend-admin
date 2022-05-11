import { BASE_API_URL } from "@/common/Constants";
import axios from "axios";
import { authHeader } from "./BaseService";

const API_URL  = BASE_API_URL + '/api/receptionist';

class ReceptionistService {

    save(User){
        return axios.post(API_URL + '/save', User, {headers: authHeader()});
    }

    findall(){
        return axios.get(API_URL + '/findall');
    }

    generateReceptionistListReport(){
        return axios.get(API_URL + '/report');
    }

    delete(){
        return null;
    }

    edit(){
        return null;
    }
  
}

export default new ReceptionistService();

