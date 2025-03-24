export const getImageUrl = (name) => {
  return new URL(`../assets/imgs/Tabbar/${name}`, import.meta.url).href
}