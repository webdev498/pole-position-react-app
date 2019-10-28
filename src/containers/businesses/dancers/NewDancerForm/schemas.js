import * as Yup from 'yup';

export const formSchema = Yup.object().shape({
  email: Yup.string()
    .email('Please enter a valid email')
    .required('required'),
  name: Yup.string()
    .min(3, 'min 3 characters')
    .max(120, 'max 120 characters')
    .required('required'),
  bio: Yup.string()
    .nullable(),
});