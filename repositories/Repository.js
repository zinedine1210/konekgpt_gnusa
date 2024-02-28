import axios from 'axios';
export const baseDomain = 'https://konekgpt.gnusa.id'; // API for products (PRODUCTION MODE)
export const WebsiteTitle =  'Konek GPT'

// tentukan protokol dan hostname berdasarkan lingkungan
let protocol = ''; //http
let host = ''; //localhost
let port = '';
let finalHostname = ''; //host website
let baseDomainAPI = '' //endpoint API

if (typeof window === 'object') {
  // Jika dijalankan di lingkungan browser
  protocol = window.location.protocol;
  port = window.location.port
  host = window.location.hostname;
  finalHostname = `${protocol}//${host}:${port}`
//   baseDomainAPI = `${protocol}//${host}:${port}`
  baseDomainAPI = "https://konekgpt.gnusa.id/service"
} else {
    port = process.env.PORT
    protocol = process.env.PROTOCOL
    host = process.env.HOST
    finalHostname = `${protocol}://${host}:${port}`
    // baseDomainAPI = `${protocol}://${host}:${port}`
    baseDomainAPI = "https://konekgpt.gnusa.id/service"
}

export const customHeaders = {
    Accept: 'application/json',
};

export const baseUrl = `${baseDomainAPI}`;

export default axios.create({
    baseUrl,
    headers: customHeaders,
});

export const cborHeaders = {
    Accept: 'application/cbor',
};

export const cborUrl = axios.create({
    baseUrl,
    headers: cborHeaders,
});

export const serializeQuery = (query) => {
    return Object.keys(query)
        .map(
            (key) =>
                `${encodeURIComponent(key)}=${encodeURIComponent(query[key])}`
        )
        .join('&');
};
