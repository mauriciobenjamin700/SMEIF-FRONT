export const cleanResponse = (response: String) => {
    response = response.replace("{","")
    response = response.replace("}","")
    response = response.replace("detail", "")
    response = response.replace(":","")
    response = response.replace('"','')
    response = response.replace('"','')

    return response
}

export const clean_cpf = (cpf: String) => {
    cpf = cpf.replace(".","")
    cpf = cpf.replace("-","")

    return cpf
}

export const formatCPFResponse = (response: String) => {
    response = clean_cpf(response)
    return clean_cpf(response)
}
export const formatAPIResponse = (response: String) => {

    response = cleanResponse(response)

    return cleanResponse(response)
};