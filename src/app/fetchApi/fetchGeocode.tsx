import { z } from "zod";

const GeodeResponseScheme = z.array(
  z.object({
    lat: z.string(),
    lon: z.string(),
    display_name: z.string(),
    
}));

type GeodeResponse = z.infer<typeof GeodeResponseScheme>;

export const fetchGeocode = async (city : string): Promise<GeodeResponse> => {
  return fetch(`${process.env.API_GEOCODE}/search?q=${city}&api_key=65a59179e0206100529633ebsc8bf8b`).then(async (res) =>
    res.json()
  );
};