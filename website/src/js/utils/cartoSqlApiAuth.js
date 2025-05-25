import { cartoApiKey } from "../constants/config";

/**
 * creates the expected fetch request options for Carto SQL API calls
 * @returns {object}
 */
export const getCartoSqlApiAuthOptions = () => {
  const headers = new Headers();
  headers.append("Authorization", `Bearer ${cartoApiKey}`);

  const requestOptions = {
    method: "GET",
    headers: headers,
    redirect: "follow",
  };

  return requestOptions;
};
