
function createQuery(page: number, humans: boolean, search?: string) {
  let filter = '';
  if (search || humans) {
    filter += `, filter: {`;
    if (search) {
      filter += ` name: "${search}"`;
    }
    if (humans) {
      filter += ` species: "Human"`;
    }
    filter += ` }`;
  }

  return `
        query {
            characters(page: ${page}${filter}) {
                info {
                    count
                    pages
                }
                results {
                    name
                    species
                    image
                    status
                }
            }
        }
    `;
}

function fetchCharactersAPI(query: string) {
  const RICKANDMORTY_API_URL = "" + (process.env.RICKANDMORTY_API_URL || "https://rickandmortyapi.com/graphql");
  return fetch(RICKANDMORTY_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query }),
  }).then((response) => response.json());
}

export async function getCharacters(page: number = 1, humans: boolean, search?: string) {
  try {

    const query = createQuery(page, humans, search);
    const responseData = await fetchCharactersAPI(query);

    const characters = responseData.data.characters.results;
    const { count, pages } = responseData.data.characters.info;

    return { data: characters, meta: { page, pages, count } };
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
}
