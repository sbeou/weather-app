/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_GEOCODE: "https://geocode.maps.co",
    API_METEO: "https://api.open-meteo.com",
    DOMAIN_ORIGIN: "http://localhost:3000",
  }
}

module.exports = nextConfig
