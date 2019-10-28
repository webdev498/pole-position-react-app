import * as Yup from 'yup';

export const formSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'min 3 characters')
    .max(120, 'max 120 characters')
    .required('Required'),
  user_ids: Yup.array()
    .of(Yup.number())
    .min(1, 'cannot be empty')
    .required('required')
});