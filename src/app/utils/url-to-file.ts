import { generateUuid } from './generate-uuid';

export async function urlToFile(url: string): Promise<File> {
  const name = generateUuid();
  let response: Response;

  try {
    response = await fetch(url);
  } catch (e) {
    console.error(e);
  }

  if (response) {
    const data = await response.blob();

    if (data?.size > 0) {
      return new File([ data ], name, { type: 'image/jpg' });
    } else {
      return null;
    }
  } else {
    return null;
  }
}