import * as Yup from 'yup';

const _DaySchema = Yup.object({
  open: Yup.string()
    .matches(/^[\d]{2}:[\d]{2}[AM|PM]{2}$/, 'Please select a time')
    .required('Required'),
  close: Yup.string()
    .matches(/^[\d]{2}:[\d]{2}[AM|PM]{2}$/, 'Please select a time')
    .required('Required'),
  closed: Yup.bool().required(),
  day: Yup.number()
    .min(0)
    .max(6)
    .required(),
}).nullable();

export const Schema = {
  name: Yup.string()
    .min(3, 'min 3 characters')
    .max(120, 'max 120 characters')
    .required('Required'),
  email: Yup.string()
    .email('Please enter a valid email')
    .required('Required'),
  state: Yup.string()
    .max(2, 'Please enter a 2 letter state abbreviation')
    .matches(/^[A-Za-z]{2}$/, 'Please enter a 2 letter state abbreviation')
    .required('Required'),
  zip: Yup.string()
    .matches(/^[\d]{5}$/, 'Please enter a 5-digit zip code')
    .required('Required'),
  city: Yup.string()
    .min(3, 'min 3 characters')
    .max(120, 'max 120 characters')
    .required('Required'),
  street1: Yup.string()
    .min(3, 'min 3 characters')
    .max(120, 'max 120 characters')
    .required('Required'),
  street2: Yup.string()
    .min(3, 'min 3 characters')
    .max(120, 'max 120 characters'),
  user_ids: Yup.array()
    .of(Yup.number())
    .min(1, 'cannot be empty')
    .required('required'),

  phone_number: Yup.string()
    .matches(/\d{3}-\d{3}-\d{4}/, 'Please use the format ###-###-####')
    .required('Required'),

  role: Yup.string().nullable(),
  notes: Yup.string().nullable(),
  hours_of_operation: Yup.object({
    Sunday: _DaySchema,
    Monday: _DaySchema,
    Tuesday: _DaySchema,
    Wednesday: _DaySchema,
    Thursday: _DaySchema,
    Friday: _DaySchema,
    Saturday: _DaySchema,
  }).required(),
  square_footage: Yup.string()
    .matches(/^\d+$/, 'Numbers only')
    .test('divisible-by-500', 'Please round to the nearest 500',
      value => value % 500 === 0)
    .default(0)
    .required('Required'),
  owner_id: Yup.number()
    .when('isCreatingNewOwner', {
      is: false,
      then: Yup.number()
        .typeError('Required')
        .required('Required'),
      otherwise: Yup.number().nullable(),
    }),
  owner_email: Yup.string()
    .when('isCreatingNewOwner', {
      is: true,
      then: Yup.string()
        .email('Please enter a valid email')
        .required('Required'),
      otherwise: Yup.string().nullable(),
    }),
  owner_name: Yup.string()
    .when('isCreatingNewOwner', {
      is: true,
      then: Yup.string()
        .min(2, 'Minimum of 2 Characters')
        .required('Required'),
      otherwise: Yup.string().nullable(),
    }),
  owner_password: Yup.string()
    .when('isCreatingNewOwner', {
      is: true,
      then: Yup.string()
        .min(8,  'Minimum of 8 Characters')
        .max(64, 'Maximum of 64 Characters')
        .required('Required'),
      otherwise: Yup.string().nullable(),
    }),
  owner_password_confirmation: Yup.string()
    .when('isCreatingNewOwner', {
      is: true,
      then: Yup.string()
        .test({
          name: 'passwords-match',
          exclusive: false,
          message: 'Passwords do not match',
          test: function(value = '') {
            return value === (this.parent.owner_password || '');
          },
        })
        .required('Required'),
      otherwise: Yup.string().nullable(),
    }),
  url: Yup.string()
    .url('Please enter a valid url')
    .nullable(),
  login_password: Yup.string()
    .required('Password is required'),
  password: Yup.string()
    .required('Password is required')
    .min(8,  'Minimum of 8 Characters')
    .max(64, 'Maximum of 64 Characters'),
  password_confirmation: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords do not Match')
    .required('Confirm password is required'),
  code: Yup.string()
    .min(4, 'min 4 characters')
    .max(16, 'max 16 characters')
    .nullable(),
  special_requirements: Yup.bool().nullable(),
  special_requirements_link: Yup.string()
    .url('Please enter a valid url')
    .nullable()
};
