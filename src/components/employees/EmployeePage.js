import React, { useEffect, useState, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

import { Content }                        from '@common/styled/Content';
import { SearchInput }                    from '@common/searchInput/SearchInput';
import { AddEmployeeButton }              from './emplyeePageStyled';
import ManagerList                        from './EmployeeList/EmployeeList';
import { LoadingClubs }                   from '../common/LoadingClubs';
import { Error }                          from '../common/styled/Error';
import { PageHeader }                     from '../common/PageHeader/PageHeader';
import { FetchEmployees, DeleteEmployee } from '../../networking/UserCalls';

const ManagerPagePresenter = props => {
  function handleDelete(selected) {
    const EMPLOYEE = list.filter(emp => emp.id === selected)[0];
    if (window.confirm(`Are you sure you want to delete ${EMPLOYEE.name}?\r\n\r\nThere is no way to revert this action.`)) {
      DeleteEmployee({
        authToken: props.authToken,
        params: {
          employee_id: selected,
          business_id: props.business.id,
        }
      })
        .then(() => {
          setList(list.filter(emp => emp.id !== selected));
          toast.success(`${EMPLOYEE.name} has been deleted successfully!`);
        })
        .catch(error => {
          console.error(error);
          toast.error(`An error occurred deleting ${EMPLOYEE.name}`);
        });
    }
  }

  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');
  const { authToken, business, setEmployeeStore } = props;

  const handleSearchChange = useCallback(
    e => setSearch(e.target.value),
    []
  );

  const FilteredList = useMemo(() => list.filter(emp =>
    emp.name.toUpperCase().includes(search.toUpperCase())), [list, search]);

  useEffect(() => {
    const params = { business_id: business.id };

    FetchEmployees({ authToken, params })
      .then(({ employees }) => {
        setList(employees);
        setEmployeeStore(employees);
      })
      .catch(() => setError('An error occurred while loading club managers'))
      .finally(() => setIsLoading(false));
  }, [authToken, setEmployeeStore, business.id]);

  const AddManager = (
    <AddEmployeeButton to="/settings/employees/new">Add New</AddEmployeeButton>
  );

  const Filters = (
    <SearchInput
      placeHolder="Search Manager(s)"
      value={search}
      onChange={handleSearchChange}
    />
  );


  return (
    <Content.Primary>
      <PageHeader
        css={{ maxWidth: '100%' }}
        title="Employees"
        LeftSide={props.isAdmin ? AddManager : null}
        RightSide={Filters}
      />

      {error !== '' && <Error>{error}</Error>}
      {isLoading
        ? <LoadingClubs />
        : (
        <ManagerList
          managers={FilteredList}
          onDelete={handleDelete}
        />
      )}
    </Content.Primary>
  );
};

ManagerPagePresenter.displayName = ManagerPagePresenter.name;

ManagerPagePresenter.propTypes = {
  authToken:        PropTypes.string.isRequired,
  business:         PropTypes.object.isRequired,
  isAdmin:          PropTypes.bool.isRequired,
  setEmployeeStore: PropTypes.func.isRequired,
};

export default ManagerPagePresenter;
