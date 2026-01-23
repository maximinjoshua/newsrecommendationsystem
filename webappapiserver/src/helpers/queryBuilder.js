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
    `;
    return { query, values }
}

const generalBatchCreateQueryBuilder = (tableName, rows) => {

  const columns = Object.keys(rows[0]);

  const valueStrings = [];
  const valueArray = [];
  let placeholderCount = 1;

  for (const row of rows) {

    const placeholders = columns
      .map(() => `$${placeholderCount++}`)
      .join(", ");

    valueStrings.push(`(${placeholders})`);

    // push instead of spread
    for (const col of columns) {
      valueArray.push(row[col]);
    }
  }

  const query = `
    INSERT INTO ${tableName} (${columns.join(", ")})
    VALUES ${valueStrings.join(", ")}
  `;

  return { query, valueArray };
};


export const queryBuilders = { generalUpdateQueryBuilder, generalCreateQueryBuilder, generalBatchCreateQueryBuilder }