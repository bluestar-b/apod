
export async function getAPOD() {
  try {
    const apiURLparam = {
      base: "https://api.nasa.gov/planetary/apod",
      api_key: process.env.APOD_KEY,
    };
    const response = await fetch(
      `${apiURLparam.base}?api_key=${apiURLparam.api_key}`
    );

    return response.json();
  } catch (error) {
    console.log("Failed to fetch APOD api");
  }
}
