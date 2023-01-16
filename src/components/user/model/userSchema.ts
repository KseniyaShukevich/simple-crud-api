interface FieldType {
  name: string;
  type: string;
  required: boolean;
}

const USER_SCHEMA = [
  {
    name: 'username',
    type: 'string',
    required: true,
  },
  {
    name: 'age',
    type: 'number',
    required: true,
  },
  {
    name: 'hobbies',
    type: 'array',
    required: true,
  },
];

export default USER_SCHEMA;

export { FieldType };
