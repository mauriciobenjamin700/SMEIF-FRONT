export const cleanResponse = (response: String) => {
    response = response.replace("{","")
    response = response.replace("}","")
    response = response.replace("detail", "")
    response = response.replace(":","")
    response = response.replace('"','')
    response = response.replace('"','')

    return response
}


export const formatAPIResponse = (response: String) => {

    response = cleanResponse(response)

    return cleanResponse(response)
};