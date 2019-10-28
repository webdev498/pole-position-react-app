export const ClubProps = {
  hours_of_operation: {
    Sunday:    { day: 0, open: '05:00PM', close: '12:00AM', closed: true },
    Monday:    { day: 1, open: '05:00PM', close: '12:00AM', closed: true },
    Tuesday:   { day: 2, open: '05:00PM', close: '12:00AM', closed: true },
    Wednesday: { day: 3, open: '11:00AM', close: '04:00AM', closed: false },
    Thursday:  { day: 4, open: '11:00AM', close: '04:00AM', closed: false },
    Friday:    { day: 5, open: '11:00AM', close: '04:00AM', closed: false },
    Saturday:  { day: 6, open: '12:00PM', close: '04:00AM', closed: false },
  },
  required_documents: [],
  profile_options: [],

  name: '',
  notes: '',
  street1: '',
  street2: '',
  city: '',
  state: '',
  zip: '',

  phone_number: '',
  square_footage: 0,

  url: '',
  owner_id: null,
  owner_email: '',
  owner_name: '',
  owner_password: '',
  owner_password_confirmation: '',

  special_requirements: false,
  special_requirements_link: ''
};
