import axios from "axios";

const fetchStates = async () => {
    const response = await axios( // Adicione o await aqui
        'https://servicodados.ibge.gov.br/api/v1/localidades/estados'
    );

    let states: string[] = response.data.map((state: any) => {
        return state.sigla
    })

    states.sort()
    // const states = response.data; // Acesse os dados da resposta
    return states

};

const fetchCities = async (state:string) => {
        const response = await axios(
            `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${state}/municipios`,
        );


        let cities: string[] = response.data.map((city: any) => {
            return city.nome
        })
        return cities
}


export {fetchStates, fetchCities}