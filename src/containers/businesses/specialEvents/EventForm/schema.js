import * as Yup from 'yup';

export const defaultSchema = Yup.object().shape({
  title: Yup.string()
    .min(8, 'min 8 characters')
    .max(120, 'max 120 characters')
    .required('required'),
  description: Yup.string()
    .min(12, 'min 8 characters')
    .max(360, 'max 360 characters')
    .required('required'),
  start_date: Yup.string()
    .required('required'),
  start_time: Yup.string()
    .matches(/^\d{2}:\d{2}$/, 'invalid')
    .required('required'),
  end_time: Yup.string()
    .matches(/^\d{2}:\d{2}$/, 'invalid')
    .required('required'),

  file: Yup.string().nullable().required('required')
});

export const editSchema = Yup.object().shape({
  title: Yup.string()
    .min(8, 'min 8 characters')
    .max(120, 'max 120 characters')
    .required('required'),
  description: Yup.string()
    .min(12, 'min 8 characters')
    .max(360, 'max 360 characters')
    .required('required'),
  start_date: Yup.string()
    .required('required'),
  start_time: Yup.string()
    .matches(/^\d{2}:\d{2}$/, 'invalid')
    .required('required'),
  end_time: Yup.string()
    .matches(/^\d{2}:\d{2}$/, 'invalid')
    .required('required'),
});