const getValidArtists = (artists) => (artists ?? []).filter((artist) => artist.name.trim().length > 0);
const formatArtists = (artists, separator = " / ") => getValidArtists(artists).map((artist) => artist.name.trim()).join(separator);
export {
  formatArtists as f,
  getValidArtists as g
};
