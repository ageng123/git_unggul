import React from 'react';
import axios from 'axios';
import {AppProperties} from '../config/config';
export const PelangganService = {
    getAll: async (query) => {
        console.log(AppProperties.endpoint);
        return await axios.get(AppProperties.endpoint+"/pelanggan?q="+query.q,{
            headers: {'Content-Type': 'application/json', 'Accept': 'application/json'}
        });
    },
    save: async (query) => {
        console.log("save", query);
        return await axios.post(AppProperties.endpoint+"/pelanggan", query,{headers:{"Content-Type": 'application/json', "Accept": "application/json"}})
    },
    delete: async (id) => {
        return await axios.delete(AppProperties.endpoint+"/pelanggan/"+id,{
            headers: {'Content-Type': 'application/json', 'Accept': 'application/json'}
        })
    },
    find: async (id) => {
        return await axios.get(AppProperties.endpoint+"/pelanggan/"+id,{
            headers: {'Content-Type': 'application/json', 'Accept': 'application/json'}
        })
    },
    update: async(data) => {
        console.log("update", data);
        return await axios.put(AppProperties.endpoint+"/pelanggan/"+data.id_pelanggan, data.form,{headers:{"Content-Type": 'application/json', "Accept": "application/json"}})
    }
}