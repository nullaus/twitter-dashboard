const config = {
  version: "2",
  base_url: process.env.REACT_APP_TWITTER_API_BASE || "",
};

function newRequestGet(path: string) {
  const url = new URL(path, config.base_url).toString();

  return new Request(url, {
    credentials: "include",
    method: "GET",
    mode: "cors",
    redirect: "follow",
    referrerPolicy: "no-referrer",
  });
}

export function getTimelineUsingHandle(handle: string) {
  const path = `twitter/recent/search/${handle}`;
  return fetch(newRequestGet(path));
}
