import axios from "axios";

function addOrRemoveItemFromCart(
  item_id: string,
  cart_id: string,
  remove: boolean
) {
  return axios.post(
    `${process.env.NEXT_PUBLIC_BACKEND_URI}/add-to-cart-new/?cart_id=${cart_id}&item_id=${item_id}&remove=${remove}`
  );
}

export { addOrRemoveItemFromCart };
