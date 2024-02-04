/* eslint-disable prettier/prettier */
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import sequelize, { FindOptions } from 'sequelize';
import { Customer } from '../entities/customer.entity';

export const Pagination = createParamDecorator(async (data: any, ctx: ExecutionContext) => {
  

  const request = ctx.switchToHttp().getRequest();
const url = request._parsedUrl.pathname.split('/'); // /product/6/review -> Product.count(), /order -> Order.count()
const splitedUrl = url[url.length -1]
let limit  =  parseInt(request.query.limit);
let page = parseInt(request.query.prev);
const query = request.query
const count = await totalCount(splitedUrl, query, request.user, request.params.id)



limit = limit > 0 ? limit : 0;
page = page > 0 ? page : 0;
const prev = count > 0 ? (page - 1) * limit + 1 : 0;

// Calculate endIndex based on whether there are more pages to load
let next;
if (count > 0 && prev + limit <= count) {
  next = prev + limit;
} else {
  next = 0;
}
// You can call your service method to get total count
return {count, limit, page, prev, next};


});

async function totalCount(url: any, query: any, user: any, id: any,) {
  let value: number;
  switch (url) {
    default:
      if (url == null) return (value = 0);
    case 'customer': {
      const where = {}

      const customerQuery: FindOptions<any>  = {

      }
      const { search } = query

      if (search) {
        if (!customerQuery.where) {
          customerQuery.where = {};
        }
  
        // Remove spaces from the search term
        const cleanedSearch = search.replace(/[\s,]+/g, '');
  
        customerQuery.where[sequelize.Op.or] = [
            sequelize.where(
                sequelize.fn('replace', sequelize.fn('concat', sequelize.col('FirstNames'), sequelize.col('LastName')), ' ', ''),
                {
                    [sequelize.Op.iLike]: `%${cleanedSearch}%`
                }
            ),
            sequelize.where(
                sequelize.fn('replace', sequelize.fn('concat', sequelize.col('LastName'), sequelize.col('FirstNames')), ' ', ''),
                {
                    [sequelize.Op.iLike]: `%${cleanedSearch}%`
                }
            ),
            {
                [sequelize.Op.and]: [
                    sequelize.where(sequelize.col('FirstNames'), {
                        [sequelize.Op.iLike]: `%${search}%`,
                    }),
                    sequelize.where(sequelize.col('LastName'), {
                        [sequelize.Op.iLike]: `%${search}%`,
                    }),
                ],
            },
        ];
    }
        const customer = await Customer.count(customerQuery)
      return customer;
    }


   
  }
}