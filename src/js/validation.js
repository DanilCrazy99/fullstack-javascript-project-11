import { object, string } from 'yup';

const userScheme = object({
  value: string().url().required(),
});

export default userScheme;
