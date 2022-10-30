// import axios from 'react-native-axios';
import axios from 'axios';

export const registerClient = async (data) => {

    const response = await axios.post('https://still-meadow-57659.herokuapp.com/api/auth/client/user/create/', {
        cnpj: data.cnpj,
        registered_name: data.registered_name,
        username: data.username,
        password: data.password,
        whatsapp: data.whatsapp
    });

    console.log('registros')
    console.log(response.data)

    return response.data;
}