import React from "react";
interface IBarang {
    id?: number|null,
    kode: string,
    nama: string,
    kategori: string,
    harga: string,
    qty?: number
}
export default IBarang;