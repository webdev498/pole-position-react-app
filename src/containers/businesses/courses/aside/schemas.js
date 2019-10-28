import * as Yup from 'yup';

export const formSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, 'min 3 characters')
    .max(120, 'max 120 characters')
    .required('Title is a required field'),
  url: Yup.string()
    .url('Url is invalid')
    .required('URL is a required field'),
  description: Yup.string()
    .nullable(),
});
