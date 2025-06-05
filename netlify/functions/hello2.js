import { Config, Context } from "@netlify/functions";

export default async (req, context) => {
  const { city, country } = context.params;

  return new Response(`You're visiting hello2 ${city} in ${country}!`);
};

export const config = {
  path: "/travel-guide2/:city/:country"
};