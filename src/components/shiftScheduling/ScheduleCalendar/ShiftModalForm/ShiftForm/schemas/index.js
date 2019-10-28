import * as Yup from 'yup'

export const formSchema = Yup.object().shape({
  startTime: Yup.string()
    .matches(/^[\d]{2}:[\d]{2}(AM|PM)$/, 'Please select a time')
    .required('Required'),
  endTime: Yup.string()
    .matches(/^[\d]{2}:[\d]{2}(AM|PM)$/, 'Please select a time')
    .required('Required'),
  isRecurring: Yup.boolean()
    .required('Required'),
  numberOfEntertainers: Yup.number()
    .min(1, 'Invalid')
    .required('Required'),
  shift_type: Yup.string()
    .required('Required')
});
