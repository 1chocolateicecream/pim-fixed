export async function ProtectedFetch(url, method, body = null) {
  try {
    const options = {
      method: method,
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("sanctum-token")}`,
        "Content-Type": "application/json",
        "Accept": "application/json"
      }
    };
    if (body && method !== "GET" && method !== "HEAD") options.body = JSON.stringify(body);
    let res = await fetch(url, options);
    let data = await res.json();
    return { ok: true, status: res.status, data };
  } catch (error) {
    return { ok: false, error };
  }
}

export async function Fetch(url, method, body = null) {
  try {
    const options = {
      method: method,
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      }
    };
    if (body && method !== "GET" && method !== "HEAD") options.body = JSON.stringify(body);
    let res = await fetch(url, options);
    let data = await res.json();
    return { ok: true, status: res.status, data };
  } catch (error) {
    return { ok: false, error };
  }
}