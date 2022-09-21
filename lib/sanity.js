import sanityClient from '@sanity/client';


export const client = sanityClient({
    projectId: process.env.NEXT_PUBLIC_ID,
    dataset: process.env.NEXT_PUBLIC_DATASET,
    apiVersion: process.env.NEXT_PUBLIC_APIVERSION,
    token: process.env.NEXT_PUBLIC_API,
    useCdn: false
  });

  export const AddAddress = (User) => {
    const newadd = {
      _type: 'Addresses',
      address: User
    }
    client.create(newadd).then((res) => {
      console.log(`address was addedd`)
    })
  };

  let QUERY = encodeURIComponent('*[_type == "Addresses"]{address}');
  let projectId = process.env.NEXT_PUBLIC_ID;
  let datasest = process.env.NEXT_PUBLIC_DATASET;
  let api = process.env.NEXT_PUBLIC_APIVERSION;
  let URL = `https://${projectId}.api.sanity.io/${api}/data/query/${datasest}?query=${QUERY}`;

  export const CheckAddress = (User) => {
    fetch(URL)
    .then((res) => res.json())
    .then(({ result }) => {
     console.log("Addresses", result);

    })
    .catch((err) => console.error(err));
  };
