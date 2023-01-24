import React from 'react';
import axios from 'axios';
import { Ajax } from '../config/ajax';

export const PenjualanService = {
    store: async (form: any) => {
        return await axios.post(Ajax.endpoint+"/penjualan", form, {
            headers: {
                'Content-type': 'application/json',
                'Accept':'application/json'
            }
        });
    },
    get: async (id: any) => {
        return await axios.get(Ajax.endpoint+"/penjualan/"+id);
    },
    getAll: async (query: any|null) => {
        if(typeof query != "string"){
            let queryParams = {};
            for(let i in query){
                queryParams[i] = query[i];
            }
            let queryBuild = new URLSearchParams(queryParams);
            query = queryBuild.toString();
        }
        return await axios.get(Ajax.endpoint+"/penjualan?"+query)
    },
    updateNoFile: async(form:any, id: string|number) => {
        return await axios.put(Ajax.endpoint+"/penjualan/"+id, form, {
            headers: {
                'Content-type': 'application/json',
                'Accept':'application/json'
            }
        });
    },
    delete: async(id: number|string) => {
        return await axios.delete(Ajax.endpoint+"/penjualan/"+id);
    }
}