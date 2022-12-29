export const emptyBlocks = {
  text: () => ({ type: 'text', body: '' }),
  gallery: () => ({ type: 'gallery', images: [], imageUrls: [] }),
  map: () => ({ type: 'map', lat: 50.45585804089458, lng: 30.53132769061594 }),
  image: () => ({ type: 'image', image: '', imageUrl: {} }),
};
