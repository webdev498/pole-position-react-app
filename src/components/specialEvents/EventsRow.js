import React from 'react';
import { Button } from '@common/styled/Button';
import userPic from '@assets/user-placeholder-mask.png';
import './styles/EventsRow.css';
import { getDefaultThumbImage } from '@statics/Helpers';

class EventsRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  onChangeRating(newRating, name) {
    switch (name) {
      case 'apperance':
        this.setState({
          apperanceRating: newRating
        });
        break;
      case 'professionalism':
        this.setState({
          professionalismRating: newRating
        });
        break;
      case 'stagePresence':
        this.setState({
          stagePresenceRating: newRating
        });
        break;
    }
  }
  onSubmit() {
    console.log('onSubmitRating');
  }
  render() {
    let className = this.props.active
      ? 'rate-user-row rate-user-active-row'
      : 'rate-user-row';
    return (
      <div
        className={className}
        onClick={() => this.props.onUserSelect(this.props.user)}
      >
        <div className={'rate-user-image-wrap'}>
          <img
            src={getDefaultThumbImage(this.props.user.images) || userPic}
            style={{ width: 140, height: 140, borderRadius: 70 }}
            alt=""
          />
        </div>
        <div className={'rate-user-info-wrap-right'}>
          <span className={'rate-user-username'}>
            Rate {this.props.user.name}'s
          </span>
          <div className={'rate-user-info-last-shift-wrap'}>
            <span className={'rate-user-last-shift-header'}>Last Shift</span>
            <span className={'rate-user-info-right-rating-spacer'}>:</span>
            <span className={'rate-user-last-shift'}>11/12/2018 19:00 PM</span>
          </div>
          <span className={'rate-user-guide'}>
            Select a rating for each and click complete
          </span>
          <div className={'rate-user-info-right-rating-wrap'}>
            <div className={'rate-user-info-right-rating-row'}>
              <span className={'rate-user-info-right-rating-header'}>
                Apperance
              </span>
              <span className={'rate-user-info-right-rating-spacer'}>:</span>
              <div className={'rate-user-info-right-rating-component'}>
              </div>
            </div>
            <div className={'rate-user-info-right-rating-row'}>
              <span className={'rate-user-info-right-rating-header'}>
                Professionalism
              </span>
              <span className={'rate-user-info-right-rating-spacer'}>:</span>
              <div className={'rate-user-info-right-rating-component'}>

              </div>
            </div>
            <div className={'rate-user-info-right-rating-row'}>
              <span className={'rate-user-info-right-rating-header'}>
                Stage Presence
              </span>
              <span className={'rate-user-info-right-rating-spacer'}>:</span>
              <div className={'rate-user-info-right-rating-component'}>
  
              </div>
            </div>
          </div>
        </div>
        <div className={'rate-user-rating-button-wrap'}>
          <Button
            onClick={this.onSubmit.bind(this)}
          >Submit</Button>
        </div>
      </div>
    );
  }
}
export default EventsRow;

EventsRow.propTypes = {
 /*  user: PropTypes.object.isRequired,
  active: PropTypes.bool.isRequired,
  onUserSelect: PropTypes.func.isRequired */
};
