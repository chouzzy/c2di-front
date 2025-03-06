const genderOptions = ["Masculino", "Feminino", "Outro"]

function capitalizeFirstLetter(str: string): string {
    if (!str) {
        return ''; // Trata strings vazias ou nulas
    }
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}


export { genderOptions, capitalizeFirstLetter }