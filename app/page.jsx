import Link from "next/link";
import { getAPOD } from "./getAPOD";


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
