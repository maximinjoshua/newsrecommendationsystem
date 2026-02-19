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

const generalCreateQueryBuilder = (tableName, queryObject, returnValues = []) => {
  const columns = Object.keys(queryObject);
  const values = Object.values(queryObject);

  const placeholders = columns
    .map((_, i) => `$${i + 1}`)
    .join(', ');

  const query = `
        INSERT INTO ${tableName} (${columns.join(', ')})
        VALUES (${placeholders})
        RETURNING ${returnValues ? returnValues.join(', ') : 'null as id'}
    `;
  return { query, values }
}

const generalBatchCreateQueryBuilder = (tableName, rows, returnValues = [], customAddColumns = {}) => {

  const originalColumns = Object.keys(rows[0]);
  const updatedColumns = [...originalColumns, ...Object.keys(customAddColumns)]

  const valueStrings = [];
  const valueArray = [];
  let placeholderCount = 1;

  for (const row of rows) {
    const placeholders = updatedColumns
      .map(() => `$${placeholderCount++}`)
      .join(", ");

    valueStrings.push(`(${placeholders})`);

    for (const col of originalColumns) {
      valueArray.push(row[col]);
    }
    for (const val of Object.values(customAddColumns)) {
      valueArray.push(val)
    }

  }

  const query = `
    INSERT INTO ${tableName} (${updatedColumns.join(", ")})
    VALUES ${valueStrings.join(", ")}
    RETURNING ${returnValues ? returnValues.join(', ') : 'null as id'}
  `;

  return { query, valueArray };
};

const getQueryBuilder = (selectColumns = null, whereConditions, tableName) => {
  const whereConditionArray = []
  const values = []
  let placeholder = 1
  for (const [whereKey, whereValue] of Object.entries(whereConditions)) {
    whereConditionArray.push(`${whereKey} = $${placeholder}`)
    placeholder++
    values.push(whereValue)
  }
  const query = `SELECT ${selectColumns ? selectColumns.join(',') : '*'}
  FROM ${tableName}
  WHERE ${whereConditionArray.join(',')}`

  return { query, values }
}


export const queryBuilders = { generalUpdateQueryBuilder, generalCreateQueryBuilder, generalBatchCreateQueryBuilder, getQueryBuilder }