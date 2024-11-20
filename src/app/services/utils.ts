

async function createInvestorUtils(data: any, projectManagerID: Investment["projectManagerID"]) {

    try {

        data = await imagesArrayAdapter(data)
        data = await documentsArrayAdapter(data)
        data = await projectTypeAdapter(data)
        data = await floorPlanTypesAdapter(data)
        data.projectManagerID = projectManagerID

        return data

    } catch (error) {
        throw error
    }

}


async function imagesArrayAdapter(data: any) {

    try {
        const images: Investment["images"] = []
        data = { ...data, images }

        for (const label in data.image) {
            if (data.image.hasOwnProperty(label)) {

                const files = data.image[label];

                for (let index = 0; index < files.length; index++) {
                    const foto = files[index];

                    images.push({
                        label: label,
                        url: foto.name,
                        description: foto.name
                    })
                    
                }
            }
        }

        delete data.image

        return data

    } catch (error) {
        throw error
    }

}

async function documentsArrayAdapter(data: any) {
    try {

        const documents: Investment["documents"] = []
        data = { ...data, documents }

        for (let index = 0; index < data.document.length; index++) {

            data.documents.push({
                title: data.document[index].name,
                url: 'https://images.unsplash.com/photo-1605146769289-440113cc3d00?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                description: data.document[index].name
            })
        }
        delete data.document

        return data

    } catch (error) {
        throw error
    }

}

async function projectTypeAdapter(data: any) {

    try {
        switch (data.projectType) {
            case 'Residencial Multifamiliar':
                data.projectType = "RESIDENCIAL_MULTIFAMILIAR"
                break
            case 'Residencial vertical':
                data.projectType = "RESIDENCIAL_VERTICAL"
                break
            case 'Comercial geral':
                data.projectType = "COMERCIAL_GERAL"
                break
            case 'Misto':
                data.projectType = "MISTO"
                break
        }

        return data

    } catch (error) {
        throw error
    }

}

async function floorPlanTypesAdapter(data: any) {

    try {

        data.floorPlanTypes = data.floorPlanTypes.split(",")

        return data

    } catch (error) {
        throw error
    }
}

export { createInvestorUtils, imagesArrayAdapter, documentsArrayAdapter, projectTypeAdapter, floorPlanTypesAdapter }