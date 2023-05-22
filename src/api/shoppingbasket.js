import { fetchJson } from "../utils/fetch";

export const basketApis = {
  basket: async () => {       
        return await fetchJson('/users/me/carts', 'GET');
    },   
  addBasket: async (body) => {       
      return await fetchJson('/users/me/carts', 'POST', {
        body: JSON.stringify(body)
      });
    },   
  };
  