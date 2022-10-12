import Cookies from 'universal-cookie';

const cookies = new Cookies();

export const setCookie = (name, value, option) => cookies.set(name, value, { path: '/login', ...option });

export const getCookie = (name) => cookies.get(name);
