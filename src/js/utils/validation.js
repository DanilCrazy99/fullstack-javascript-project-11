import { object, string, setLocale } from 'yup';

setLocale({
  string: {
    url: 'invalidUrl',
  },
  mixed: {
    required: 'nullValue',
  },
});

const userScheme = object({
  value: string().url().required(),
});

export default userScheme;
