import * as yup from 'yup';

const schema = yup.object().shape({
  url: yup.string().url().required(),
});

export default (value) => schema
  .validate({ url: value }, { strict: true })
  .then(({ url }) => url)
  .catch(console.error);
