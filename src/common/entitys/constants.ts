import { IsNull } from 'typeorm';

export const softDeleteCondition = { deleteAt: IsNull(), deleteBy: IsNull() };
export const softDeleteConditionToString = (tableName: string) => {
    return `${tableName}.deleteAt is NULL AND ${tableName}.deleteBy is NULL`;
};
