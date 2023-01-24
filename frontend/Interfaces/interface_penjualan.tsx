import React from "react";

export interface IItemPenjualan{
    id?: number|null,
    nota?: string,
    kode_barang: string,
    qty:number
}
export interface IPenjualan {
    id?: number|null,
    id_nota?: string,
    subtotal: string,
    tgl: string,
    kode_pelanggan?: string,
    subtotal_string?: string,
    detail_penjualan?:IItemPenjualan[]
}