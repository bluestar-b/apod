import Link from "next/link";
import { truncateString } from "./truncateString";

export const revalidate = 4000;

async function getAPOD() {
  try {
    const apiURLparam = {
      base: "https://api.nasa.gov/planetary/apod",
      api_key: process.env.APOD_KEY,
    };
    const response = await fetch(
      `${apiURLparam.base}?api_key=${apiURLparam.api_key}`,
    );

    return response.json();
  } catch (error) {
    console.log("Failed to fetch APOD api");
  }
}

export async function generateMetadata() {
  const apodDataMeta = await getAPOD();
  return {
    metadataBase: new URL('https://apod.notmycode.dev'),
    title: apodDataMeta.title,
    openGraph: {
      title: apodDataMeta.title,
      description: truncateString(apodDataMeta.explanation, 64),
    },
  };
}

export default async function Home() {
  const apodData = await getAPOD();

  return (
    <main className="flex flex-col items-center justify-center min-h-screen py-2 bg-black text-white">
      <h1 className="text-xl md:text-4xl font-bold mb-2 px-4">
        {apodData.title}
      </h1>
      <p className="text-sm mb-2 px-4">{apodData.date}</p>
      <div className="p-2 rounded-md">
        <Link href={apodData.url}>
          <img
            alt="Quadrantid Meteor Shower"
            className="w-full max-w-md rounded-lg object-cover mb-10"
            src={apodData.url}
          />
        </Link>
      </div>

      <p className="p-4 text-center text-md max-w-lg overflow-hidden overflow-ellipsis lg:max-w-xl">
        {apodData.explanation}
      </p>
      <footer className="mt-auto text-center p-4">
        <p className="text-sm">{apodData.copyright}</p>
      </footer>
    </main>
  );
}
