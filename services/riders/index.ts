export async function getRiders() {
  const res = await fetch("http://localhost:3001/riders", {
    cache: "no-store",
  });
  return res.json();
}

export async function getRidersWithCaching() {
  const res = await fetch("http://localhost:3001/riders");

  return res.json();
}

export async function getRider(idRider: number) {
  const res = await fetch(`http://localhost:3001/riders/${idRider}`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error(res.statusText);

  return res.json();
}

export async function getRidersRunInCategory(id: number) {
  const res = await fetch(`http://localhost:3001/races/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error(res.statusText);
  const result = await res.json();
  // console.log(result.data[0]);
  return result.data;
}