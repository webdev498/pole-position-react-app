import { userSelector } from '../Auth';

export const businessSelector = ({ business }) => business;
export const getBusinessId = ({ business }) => (business ? business.id : null);

export const businessOwnerIsUser = state => {
  const USER = userSelector(state);
  const BUSINESS = businessSelector(state);

  if (!BUSINESS || !USER) return false;

  return USER.id === businessSelector(state).owner.id;
};
