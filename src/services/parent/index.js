import { put } from "../requests";


export const updateParent = async (data) => {
    const response = await put(`/user/update?user_cpf=${data.cpf}`, data);
    console.log(response)
    return response;
};