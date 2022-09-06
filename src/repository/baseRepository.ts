/* eslint-disable @typescript-eslint/ban-ts-comment */
// Keep in mind that this file is automatically generated.
// You can change the content of this file, but it will be overwritten.

import { Prisma } from '@prisma/client';
import _ from 'lodash';
import {
  Aggregate,
  AnyRecord,
  BaseOption,
  CountArgs,
  Find,
  ModelName,
  models,
  ModelScalarFields,
  ModelStructure,
  ModelTypes,
} from './models';

/**
 * @param modelName - The model name
 */

const BaseRepository = <
  T extends ModelName,
  Where extends ModelTypes[T]['Where'],
  Select extends ModelTypes[T]['Select'],
  Include extends ModelTypes[T]['Include'],
  Create extends ModelTypes[T]['Create'],
  Update extends ModelTypes[T]['Update'],
  Cursor extends ModelTypes[T]['Cursor'],
  Order extends ModelTypes[T]['Order'],
  Delegate extends ModelTypes[T]['Delegate'],
  Scalar extends ModelScalarFields<T>,
  Model extends ModelStructure[T]
>(
  modelName: T
) => {
  abstract class AbstractBaseRepository {
    protected static modelName: T = modelName;

    // eslint-disable-next-line class-methods-use-this
    private static extractCondition(conditions: Cursor | Where | number | string) {
      const dbCond = _.isObject(conditions) ? conditions : { id: _.toNumber(conditions) };

      return dbCond;
    }

    public static async findAll(
      conditions: Where | number | string,
      filterQueryParams: AnyRecord = {},
      query: AnyRecord = {},
      option: Find<Select, Include, Cursor, Order, Scalar> = {}
    ) {
      const limit = +(query.limit === 'all' ? 0 : _.get(query, 'limit', 10));
      const offset = query.page && query.page > 0 ? limit * (query.page - 1) : 0;
      const otherOptions = _.omit(query, ['limit', 'offset', 'page']);

      const where = {
        ...AbstractBaseRepository.extractCondition(conditions),
        ...filterQueryParams,
        ...otherOptions,
      };

      return {
        // @ts-ignore
        rows: (await AbstractBaseRepository.model.findMany({
          where,
          ...option,
          skip: offset,
          ...(limit > 0 && { take: limit }),
        })) as Model[],
        /* @ts-ignore */
        count: await this.count(where),
      };
    }

    public static async findOne(
      conditions: Where | number | string,
      option: Find<Select, Include, Cursor, Order, Scalar> = {}
    ) {
      const where = AbstractBaseRepository.extractCondition(conditions);

      // @ts-ignore
      return AbstractBaseRepository.model.findFirst({ where, ...option }) as Promise<Model | null>;
    }

    public static async findUnique(
      conditions: Cursor | number | string,
      option: BaseOption<Include, Select> = {}
    ) {
      const where = AbstractBaseRepository.extractCondition(conditions);

      // @ts-ignore
      return AbstractBaseRepository.model.findUnique({ where, ...option }) as Promise<Model | null>;
    }

    public static async create(data: Create, option: BaseOption<Include, Select> = {}) {
      // @ts-ignore
      return AbstractBaseRepository.model.create({ data, ...option }) as Promise<Model>;
    }

    public static async update(
      conditions: Where | number | string,
      data: Update | Create,
      option: BaseOption<Include, Select> = {}
    ) {
      const where = AbstractBaseRepository.extractCondition(conditions);

      // @ts-ignore
      return AbstractBaseRepository.model.update({ data, where, ...option }) as Promise<Model>;
    }

    public static async delete(conditions: Where | number | string) {
      const where = AbstractBaseRepository.extractCondition(conditions);

      // @ts-ignore
      return AbstractBaseRepository.model.deleteMany({ where }) as Promise<Prisma.BatchPayload>;
    }

    public static async deleteOne(conditions: Where | number | string) {
      const where = AbstractBaseRepository.extractCondition(conditions);

      // @ts-ignore
      return AbstractBaseRepository.model.delete({ where }) as Promise<Model>;
    }

    public static async updateOrCreate(
      conditions: Where | number | string,
      data: Create,
      option: Find<Select, Include, Cursor, Order, Scalar> = {}
    ) {
      const obj = await AbstractBaseRepository.findOne(conditions, option);

      if (obj) return AbstractBaseRepository.update(conditions, data, option);

      return AbstractBaseRepository.create(data);
    }

    public static async bulkCreate(data: Prisma.Enumerable<Create>, skipDuplicates = true) {
      // @ts-ignore
      return AbstractBaseRepository.model.createMany({
        data,
        skipDuplicates,
      }) as Promise<Prisma.BatchPayload>;
    }

    public static async bulkUpdate(where: Where, data: Prisma.Enumerable<Update>) {
      // @ts-ignore
      return AbstractBaseRepository.model.updateMany({
        data,
        where,
      }) as Promise<Prisma.BatchPayload>;
    }

    public static async count(
      conditions: Where | number | string,
      option: CountArgs<Select, Cursor, Order, Scalar> = {}
    ) {
      const where = AbstractBaseRepository.extractCondition(conditions);

      // @ts-ignore
      return AbstractBaseRepository.model.count({ where, ...option }) as Promise<number>;
    }

    public static aggregate(
      conditions: Where | number | string,
      aggregator: Omit<
        // @ts-ignore
        Parameters<typeof this.model.aggregate>[0],
        'cursor' | 'take' | 'skip' | 'orderBy'
      >,
      option: Aggregate<Cursor, Order, Scalar> = {}
    ) {
      // @ts-ignore
      const aggregate = AbstractBaseRepository.model.aggregate as Delegate['aggregate'];
      const where = AbstractBaseRepository.extractCondition(conditions);

      if (_.isEmpty(aggregator)) {
        // @ts-ignore
        // eslint-disable-next-line no-param-reassign, no-underscore-dangle
        aggregator._count = true;
      }

      // @ts-ignore
      return aggregate({ where, ...aggregator, ...option }) as ReturnType<typeof aggregate>;
    }

    public static get model(): Delegate {
      // @ts-ignore
      return models[AbstractBaseRepository.modelName];
    }
  }

  return AbstractBaseRepository;
};

export default BaseRepository;
