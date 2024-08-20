const genreList = document.getElementById("genresList");
const popArtistsList = document.getElementById("popArtistsList");
async function getArtists() {
  const ids =
    "6eUKZXaKkcviH0Ku9w2n3V,1dfeR4HaWDbWqFHLkxsg1d,66CXWjxzNUsdJxJ2JdwvnR,04gDigrS5kc9YWfZHwBETP,53XhwfbYqKCa1cC15pYq2q,7dGJo4pcD2V6oG8kP0tJRR,1HY2Jd0NmPuamShAr6KMms,4gzpq5DPGxSnKTe4SA8HAU,6vWDO969PvNqNYHIOW5v0m,0du5cEVh5yTK9QJze8zA0C,5pKCCKE2ajJHZ9KAiaK11H,0EmeFodog0BfCgMzAIvKQp,1uNFoZAHBGtllmzznpCI3s,6S2OmqARrzebs0tKUEyXyp,06HL4z0CvFAxyc27GXpf02";
  const responseArtistas = await fetch(
    "https://api.spotify.com/v1/artists?ids=" + ids,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer BQA-FIVf69pCOw5niTYB_namnezzjuqfz7szmjDHj1PGennm8GctDiehHSfIYCrGvWTdJ5nvgEmTei2ox7nc4PfD9Jolizmg23fhv-ImSGLgIrdiMrI",
      },
    }
  );
  const dataArtistas = await responseArtistas.json();
  return dataArtistas.artists;
}
(async () => {
  const artistas = await getArtists();
  const artistas_pop = artistas.filter((artista) =>
    artista.genres.includes("pop")
  );
  artistas_pop.sort((a, b) => b.followers.total - a.followers.total);

  let generos = {};
  artistas.forEach((artista) => {
    artista.genres.forEach((genre) => {
      generos[genre] = (generos[genre] || 0) + 1;
    });
  });

  const generos_ordenados = Object.entries(generos).sort((a, b) => b[1] - a[1]);

  const top_5 = generos_ordenados.slice(0, 5).map((genre) => genre[0]);

  top_5.forEach(function (genre) {
    const li = document.createElement("li");

    li.textContent = genre;

    genreList.appendChild(li);
  });

  artistas_pop.forEach(function (artista) {
    const li = document.createElement("li");

    li.textContent = `Nome: ${artista.name};
     Seguidores: ${artista.followers.total}`;

    popArtistsList.appendChild(li);
  });
})();
