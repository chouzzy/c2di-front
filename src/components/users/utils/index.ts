const genderOptions = ["Masculino", "Feminino", "Outro"]

function capitalizeFirstLetter(str: string): string {
    if (!str) {
        return ''; // Trata strings vazias ou nulas
    }

    if (str === 'MEDIA360') {
        return 'Mídia 360º'
    }
    if (str === 'LANCAMENTO') {
        return 'Lançamento'
    }
    if (str === 'CONSTRUCAO') {
        return 'Construção'
    }
    if (str === 'FINALIZACAO') {
        return 'Finalização'
    }

    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}


export { genderOptions, capitalizeFirstLetter }