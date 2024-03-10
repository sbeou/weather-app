import { z } from "zod";

import { IGeocodeData } from "@/interfaces/interface";

const MeteoResponseScheme = z.object({
    current_weather: z.object({ 
    is_day: z.number(),
    temperature: z.number(),
    time: z.string(),
    weathercode: z.number(),
    winddirection: z.number(),
    windspeed: z.number(),
  }),
  daily: z.object({
    sunrise: z.string().array(),
    sunset: z.string().array(),
    temperature_2m_max: z.number().array(),
    temperature_2m_min: z.number().array(),
    time: z.string().array(),
    uv_index_max: z.number().array(),
    weathercode: z.number().array(),
  })
    
});

type MeteoResponse = z.infer<typeof MeteoResponseScheme>;

export const fetchMeteo = async (geocode:IGeocodeData): Promise<MeteoResponse> => {
  return fetch(`${process.env.API_METEO}/v1/forecast?latitude=${geocode.lat}&longitude=${geocode.lon}&current=is_day&current_weather=true&daily=weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max&timezone=auto&forecast_days=6`).then(async (res) =>
    res.json()
  );
};