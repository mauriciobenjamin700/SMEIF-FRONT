import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
    name: 'user',
    initialState: {
        cpf: "",
        name: "",
        birth_date: "",
        gender: "",
        phone: "",
        phone_optional: "",
        email: "",
        level: null,
        state: "",
        city: "",
        neighborhood: "",
        street: "",
        house_number: "",
        complement: ""
    },
    reducers:{
        setUser: (estado, action) => {
            const { cpf , 
                    name,
                    birth_date,
                    gender,
                    phone,
                    phone_optional,
                    email,
                    level,
                    state,
                    city,
                    neighborhood,
                    street,
                    house_number,
                    complement
                } = action.payload;
                estado.cpf = cpf, 
                estado.name = name,
                estado.birth_date = birth_date,
                estado.gender = gender,
                estado.phone = phone,
                estado.phone_optional = phone_optional,
                estado.email = email,
                estado.level = level,
                estado.state = state,
                estado.city = city,
                estado.neighborhood = neighborhood,
                estado.street = street,
                estado.house_number = house_number,
                estado.complement = complement
        },
        clearUser: (estado) => {
            estado.cpf = "",
            estado.name = "",
            estado.birth_date = "",
            estado.gender = "",
            estado.phone = "",
            estado.phone_optional = "",
            estado.email = "",
            estado.level = null,
            estado.state = "",
            estado.city = "",
            estado.neighborhood = "",
            estado.street = "",
            estado.house_number = "",
            estado.complement = ""
        }
    }
})

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;