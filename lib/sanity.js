import sanityClient from '@sanity/client';


export const client = sanityClient({
    projectId: process.env.NEXT_PUBLIC_ID,
    dataset: process.env.NEXT_PUBLIC_DATASET,
    apiVersion: process.env.NEXT_PUBLIC_APIVERSION,
    token: process.env.NEXT_PUBLIC_API,
    useCdn: false
  });

  export const AddAddress = async(ID, User) => {
    const newadd = await client.patch(ID, {
      "insert": { "after": "address[-1]", "items": [User]  } 
    }).commit().then((res) => {
      console.log(User)
    });
  };

