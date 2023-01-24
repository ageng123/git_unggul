import axios from "axios";
import { AppProperties } from "../../config/config";

export const GET_MODEL = 'GET_MODEL';
export function setModel(props){
    return {
        type: GET_MODEL,
        payload: props
    }
}
export function getModel(props){
    return async (dispatch) => {
        return axios.get(AppProperties.endpoint+"pelanggan").then(resp => {
            dispatch(setModel(resp.data.data));
        })
    }
}
const initialPelangganState = {
    nama: "",
    id_pelanggan: "",
    domisili: "",
    jenis_kelamin: ""
}
export const PelangganReducer = (state = initialPelangganState, action) => {
    switch(action.type) {
        case 'GET_MODEL':
            return {...state};
        break;
        case 'SET_MODEL':
            
            return {
                ...state,
                [action.payload.type]:action.payload.value
            };
        break;
        case 'CLEAR_MODEL':
            console.log("ClearModel");
            return {...state, id: "",nama: "", domisili: "", id_pelanggan: "", jenis_kelamin: ""}
        break;
        default:
            return state;
    }
}
export default PelangganReducer