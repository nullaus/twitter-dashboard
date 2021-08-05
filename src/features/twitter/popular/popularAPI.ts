import { getTimelineUsingHandle } from "../../../worker/twitter/twitterWorker";

export function fetchData(handle: string) {
  return getTimelineUsingHandle(handle);
}

export async function fetchDataSync(handle: string) {
  const resp = await getTimelineUsingHandle(handle);
  return resp.json();
}
