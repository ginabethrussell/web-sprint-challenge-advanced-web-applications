import { axiosWithAuth } from './axiosWithAuth';

export const getColors = () => {
    return axiosWithAuth().get('/colors')
        .then(res => res)
        .catch(err => err);
  }