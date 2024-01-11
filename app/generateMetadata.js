import { truncateString } from "./truncateString";
import { getAPOD } from "./getAPOD";


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
