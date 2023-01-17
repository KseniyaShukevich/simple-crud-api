interface FieldType {
  name: string;
  type: string;
  childrenType?: string;
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
    childrenType: 'string',
    required: true,
  },
];

export default USER_SCHEMA;

export { FieldType };
