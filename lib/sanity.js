import sanityClient from '@sanity/client';


export const client = sanityClient({
    projectId: process.env.NEXT_PUBLIC_ID,
    dataset: process.env.NEXT_PUBLIC_DATASET,
    apiVersion: process.env.NEXT_PUBLIC_APIVERSION,
    token: process.env.NEXT_PUBLIC_API,
    useCdn: false
  });

  export const sanity = (User) => {
    const newadd = {
      _type: 'Addresses',
      address: User
    }
    client.create(newadd).then((res) => {
      console.log(`address was addedd`)
    })
  };
