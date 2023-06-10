function getUrl() {
  const url = import.meta.env.DEV
    ? import.meta.env.VITE_DEV_URL
    : import.meta.env.VITE_PROD_URL;
  return url;
}

export default getUrl;
