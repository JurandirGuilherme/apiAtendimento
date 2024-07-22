import Express, { response } from 'express';

const resp = (status:number, msg:unknown) => ({status, msg})


export default resp;