import USER_SCHEMA, { FieldType } from './model/userSchema';
import UserDtoType from './UserDtoType';

const getTrimedBody = (body: UserDtoType): UserDtoType => {
  const keys = Object.keys(body);
  let trimedBody = {} as UserDtoType;

  keys.forEach((key) => {
    const value = body[key as keyof UserDtoType];
    const isValueString = typeof value === 'string';
    const newValue = isValueString ? value.trim() : value;

    trimedBody = { ...trimedBody, [key]: newValue };
  });

  return trimedBody;
};

const getRequiredFieldsMessages = (
  body: UserDtoType,
  requiredFileds: Array<FieldType>,
): Array<string> => {
  const messages: Array<string> = [];
  const filedsName = requiredFileds.map((filed) => filed.name);

  filedsName.forEach((filedName) => {
    const value = body[filedName as keyof UserDtoType];

    if (!value) {
      const message = `Field ${filedName} is required.`;

      messages.push(message);
    }
  });

  return messages;
};

const getFiledsTypeMessages = (body: UserDtoType, fields: Array<FieldType>): Array<string> => {
  const keys = Object.keys(body);
  const messages: Array<string> = [];

  keys.forEach((key) => {
    const value = body[key as keyof UserDtoType];
    const valueType = typeof value;
    const schemaField = fields.find((field) => field.name === key);
    const schemaType = schemaField?.type;
    const isSchemaTypeArray = schemaType === 'array';
    const isCurrentValueTypeArray = Array.isArray(value);

    const isNotArrayTypesMatched = valueType === schemaType;
    const isArrayTypeMatched = isSchemaTypeArray && isCurrentValueTypeArray;

    if (!isNotArrayTypesMatched && !isArrayTypeMatched && schemaField) {
      const message = `Field ${key} must be ${schemaType} type.`;

      messages.push(message);
    }
  });

  return messages;
};

const getValidationUserMessages = (body: UserDtoType) => {
  const trimedBody = getTrimedBody(body);
  const requiredFileds = USER_SCHEMA.filter((field) => field.required);
  const requiredMessages = getRequiredFieldsMessages(trimedBody, requiredFileds);
  const typesMessages = getFiledsTypeMessages(trimedBody, USER_SCHEMA);

  const validationMessages = [...requiredMessages, ...typesMessages];

  return validationMessages;
};

export default getValidationUserMessages;
