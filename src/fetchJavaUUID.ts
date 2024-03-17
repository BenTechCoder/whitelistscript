export default async function fetchJavaUUID(name: string) {
    const response = await fetch(
      `https://playerdb.co/api/player/minecraft/${name}`
    );
  
    // TODO: FIX the "any" workaround
    const UUID: any = await response.json();
    // console.log(await UUID.data.player.id)
    return await UUID.data.player.id;
  }
  