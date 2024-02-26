const removeHttp = (url: string) => {
  return url.replace(/(^\w+:|^)\/\//, "");
};

export const Profile = () => {
  return <h1>Profile</h1>;
};
