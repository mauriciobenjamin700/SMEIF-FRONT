import { put } from "../requests";


export const updateSelf = async (data) => {
    const response = await put(`/user/update-self`, data);
    console.log(response)
    return response;
};