import { NextApiRequest, NextApiResponse } from "next";

import CityData from "@/interfaces/city"
import cities from "@/lib/city.list.json"

const Cities = cities as CityData[];
const NUM_SUGGESTIONS = 5;

function searchCities(pValue: string): CityData[] {
    const matchedCities = Cities.filter(city => city.name.toLowerCase().startsWith(pValue.toLowerCase())).slice(0, NUM_SUGGESTIONS)
    return matchedCities
}

export default function handler({query: {name}}: NextApiRequest, pRes: NextApiResponse) {
    const cityName = Array.isArray(name) ? name.join('') : name;
    const filteredCities = cityName ? searchCities(cityName) : [];

    return pRes.json({
        cities: filteredCities
    })
}