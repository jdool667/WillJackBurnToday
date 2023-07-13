import client from "./client";

export const getUV = async (coords) => {
  try {
    const { data } = await client.post("/getUV", coords);
    return data;
  } catch (err) {
    const { response } = err;
    if (response?.data) {
      return response.data;
    }
    return { error: err.message || err };
  }
};
