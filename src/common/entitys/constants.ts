import { IsNull } from 'typeorm';

export const softDeleteCondition = { deleteAt: IsNull(), deleteBy: IsNull() };
