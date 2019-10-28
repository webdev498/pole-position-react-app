import React from 'react';
import PropTypes from 'prop-types';
import { Scroll } from '@common/styled/Scroll';
import { DancerBox } from '@common/DancerList/DancerBox';
import { getDefaultThumbImage } from '@statics/Helpers';
import { Row } from '@common/styled/Flex';

const propTypes = {
  isEditting: PropTypes.bool.isRequired,
  dancers: PropTypes.array.isRequired,
  onImageClick: PropTypes.func.isRequired,
  onNameClick: PropTypes.func.isRequired,
  onRemoveClick: PropTypes.func.isRequired,
}

const DancerList = (props) => {
  const {
    isEditting,
    dancers,
    onImageClick,
    onNameClick,
    onRemoveClick
  } = props;
  return (
    <Scroll width="100%">
      <Row wrap="wrap">
        {dancers.map((dancer) =>
          <DancerBox
            key={dancer.id}
            active={false}
            selectable={false}
            name={dancer.name}
            required_documents={dancer.required_documents}
            image={getDefaultThumbImage(dancer.images)}
            width="100px"
            onImageClick={() => onImageClick(dancer.id)}
            onNameClick={() => onNameClick(dancer.id)}
            onCloseClick={isEditting ? () => onRemoveClick(dancer.id) : null}
          />
        )}
      </Row>
    </Scroll>
  );
}

DancerList.propTypes = propTypes;

export { DancerList };