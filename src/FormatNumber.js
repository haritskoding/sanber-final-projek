import React, { useEffect, useState } from 'react'

export const Kematian = (props) => {
    let bilangan = 0;
    bilangan += props.mati;
    let number_string = bilangan.toString(),
        sisa = number_string.length % 3,
        kematian = number_string.substr(0, sisa),
        format2 = number_string.substr(sisa).match(/\d{3}/g);

    if (format2) {
        let separator = sisa ? '.' : '';
        kematian += separator + format2.join('.')
    }

    return (
        <React.Fragment>
            {kematian} &nbsp; Orang
        </React.Fragment>
    )
}


export const KasusPositif = (props) => {
    let bilangan = 0;
    bilangan += props.cases;
    let number_string = bilangan.toString(),
        sisa = number_string.length % 3,
        KasusPositif = number_string.substr(0, sisa),
        format2 = number_string.substr(sisa).match(/\d{3}/g);
    if (format2) {
        let separator = sisa ? '.' : '';
        KasusPositif += separator + format2.join('.')
    }
    return (
        <React.Fragment>
            {KasusPositif} &nbsp; Orang
        </React.Fragment>
    )
}


export const Sembuh = (props) => {
    let bilangan = 0;
    bilangan += props.sembuh;
    let number_string = bilangan.toString(),
        sisa = number_string.length % 3,
        Sembuh = number_string.substr(0, sisa),
        format2 = number_string.substr(sisa).match(/\d{3}/g);
    if (format2) {
        let separator = sisa ? '.' : '';
        Sembuh += separator + format2.join('.')
    }
    return (
        <React.Fragment>
            {Sembuh} &nbsp; Orang
        </React.Fragment>
    )
}
