const generalUpdateQueryBuilder = (tableName, queryObject) => {
    const columns = Object.keys(queryObject);
    const values = Object.values(queryObject);

    const placeholders = columns
        .map((columnName, i) => `${columnName} = $${i + 1}`)
        .join(', ');

    const query = `
        UPDATE ${tableName}
        SET ${placeholders}
        WHERE id=${queryObject.id}
        RETURNING *
    `;
    return { query, values }
}

const generalCreateQueryBuilder = (tableName, queryObject) => {
    const columns = Object.keys(queryObject);
    const values = Object.values(queryObject);

    const placeholders = columns
        .map((_, i) => `$${i + 1}`)
        .join(', ');

    const query = `
        INSERT INTO ${tableName} (${columns.join(', ')})
        VALUES (${placeholders})
        RETURNING *
    `;
    return { query, values }
}

export const queryBuilders = {generalUpdateQueryBuilder, generalCreateQueryBuilder}