export default async function fetchJavaUUID(name: string) {
  const response = await fetch(
    `https://playerdb.co/api/player/minecraft/${name}`
  );

  const UUID = await response.json();
  if (UUID.success === true) {
    return await UUID.data.player.id;
  } else {
    return "none";
  }
}
