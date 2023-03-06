// const queryStringToMongoDB = (queryString) => {
//     const queryParams = new URLSearchParams(queryString);
//     const mongoQuery = {};

//     for (const [key, value] of queryParams) {
//         const [field, condition] = key.split('__');

//         switch (condition) {
//             case 'lt':
//                 mongoQuery[field] = { $lt: value };
//                 break;
//             case 'lte':
//                 mongoQuery[field] = { $lte: value };
//                 break;
//             case 'gt':
//                 mongoQuery[field] = { $gt: value };
//                 break;
//             case 'gte':
//                 mongoQuery[field] = { $gte: value };
//                 break;
//             case 'ne':
//                 mongoQuery[field] = { $ne: value };
//                 break;
//             case 'in':
//                 mongoQuery[field] = { $in: value.split(',') };
//                 break;
//             case 'nin':
//                 mongoQuery[field] = { $nin: value.split(',') };
//                 break;
//             case 'exists':
//                 mongoQuery[field] = { $exists: (value === 'true') };
//                 break;
//             case 'regex':
//                 mongoQuery[field] = { $regex: value, $options: 'i' };
//                 break;
//             case 'null':
//                 if (value === 'true') {
//                     mongoQuery[field] = null;
//                 } else if (value === 'false') {
//                     mongoQuery[field] = { $ne: null };
//                 }
//                 break;
//             default:
//                 mongoQuery[field] = value;
//         }
//     }
//     return mongoQuery;
// };

// 'http://example.com/api/items?field1__lt=10&field2__lte=20&field3__gt=30&field4__gte=40&field5__ne=50&field6__in=60,70,80&field7__nin=90,100,110&field8__exists=true&field9__regex=value&field10__null=true&limit=100&skip=200&sort=field11&and[0][field12__gt]=120&and[1][field13__lte]=130&or[0][field14__ne]=140&or[1][field15__in]=150,160,170&not[field16__regex]=value&set[field17]=180&push[field18]=190&pull[field19]=200'

// 'http://example.com/api/items?
// field1__lt=10
// &field2__lte=20
// &field3__gt=30
// &field4__gte=40
// &field5__ne=50
// &field6__in=60,70,80
// &field7__nin=90,100,110
// &field8__exists=true
// &field9__regex=value
// &field10__null=true
// &limit=100
// &skip=200
// &sort=field11
// &and[0][field12__gt]=120
// &and[1][field13__lte]=130
// &or[0][field14__ne]=140
// &or[1][field15__in]=150,160,170
// &not[field16__regex]=value
// &set[field17]=180
// &push[field18]=190
// &pull[field19]=200'


const queryStringToMongoDB = async (queryString) => {

  const url = new URL(`http://localhost${queryString}`);
  let queryParams = url.searchParams;

  const mongoQuery = {};
  let sort = {};
  let limit = null;
  let skip = null;

  for (const [key, value] of queryParams) {
    const [field, condition] = key.split("__");

    switch (condition) {
      case "eq":
        mongoQuery[field] = { $eq: value };
        break;
      case "lt":
        mongoQuery[field] = { $lt: value };
        break;
      case "lte":
        mongoQuery[field] = { $lte: value };
        break;
      case "gt":
        mongoQuery[field] = { $gt: value };
        break;
      case "gte":
        mongoQuery[field] = { $gte: value };
        break;
      case "ne":
        mongoQuery[field] = { $ne: value };
        break;
      case "in":
        mongoQuery[field] = { $in: value.split(",") };
        break;
      case "nin":
        mongoQuery[field] = { $nin: value.split(",") };
        break;
      case "exists":
        mongoQuery[field] = { $exists: value === "true" };
        break;
      case "regex":
        mongoQuery[field] = { $regex: value, $options: "i" };
        break;
      case "null":
        if (value === "true") {
          mongoQuery[field] = null;
        } else if (value === "false") {
          mongoQuery[field] = { $ne: null };
        }
        break;
      case "sort":
        sort[field] = value === "asc" ? 1 : -1;
        break;
      case "limit":
        limit = parseInt(value);
        break;
      case "skip":
        skip = parseInt(value);
        break;
      case "and":
        if (!mongoQuery["$and"]) {
          mongoQuery["$and"] = [];
        }
        mongoQuery["$and"].push({ [field]: value });
        break;
      case "or":
        if (!mongoQuery["$or"]) {
          mongoQuery["$or"] = [];
        }
        mongoQuery["$or"].push({ [field]: value });
        break;
      case "not":
        mongoQuery[field] = { $not: value };
        break;
      case "set":
        mongoQuery[field] = { $set: value };
        break;
      case "push":
        mongoQuery[field] = { $push: value };
        break;
      case "pull":
        mongoQuery[field] = { $pull: value };
        break;
      default:
        if (!isNaN(Number(value))) {
          mongoQuery[field] = Number(value);
        } else {
          mongoQuery[field] = value;
        }
    }
  }
  return { query: mongoQuery, options: { sort, limit, skip } };
};

export { queryStringToMongoDB };
