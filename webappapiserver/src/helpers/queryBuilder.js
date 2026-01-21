const generalUpdateQueryBuilder = (queryObject) => {
    var queryElements = ''
    for (const [key, value] of Object.entries(queryObject)) {
        console.log(`${key}: ${value}`);
        queryElements += `${key} = ${value}`
        return queryElements
}
}

const generalCreateQueryBuilder = (queryObject) => {
    var queryElements = ''
    var intoQueryElement = ''
    var valueQueryElement = ''
    for (const [key, value] of Object.entries(queryObject)) {
        console.log(`${key}: ${value}`);
        intoQueryElement += `${key},`
        valueQueryElement += `${value},`
    
    queryElements = `(${intoQueryElement}) VALUES (${valueQueryElement})`
    return queryElements
}
}

export const queryBuilders = {generalUpdateQueryBuilder, generalCreateQueryBuilder}