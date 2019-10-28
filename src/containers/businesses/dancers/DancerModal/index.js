import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Carousel } from 'react-responsive-carousel'
import {
  MdChatBubble,
} from 'react-icons/md'

import { Modal } from '@common/Modal'
import { CreateConversation } from '@networking/ConversationCalls'
import { blockDancer } from '@actions/BlockDancer'
import { authTokenSelector } from '@selectors/Auth'
import { businessSelector } from '@selectors/Business'
import { Routes } from '@statics/Routes'

import { Scroll } from '@common/styled/Scroll'
import defaultUserPic from '@assets/user-placeholder-mask.png'
import * as Btn from '@common/styled/Buttons'
import './styles/Carousel.css'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import * as S from './styled'

class DancerModal extends React.Component {
  static propTypes = {
    show: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    onBlockClick: PropTypes.func,
    dancer: PropTypes.object,
    business: PropTypes.object,
    showMessageButton: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    showMessageButton: true,
  }

  constructor(props) {
    super(props);
    this.state = {
      redirectToConversationsPage: false,
      conversation: null,
    };
  }

  closeModal = () => {
    const { handleClose } = this.props;
    handleClose();
  }

  messageUser = (user) => {
    const { authToken, business } = this.props;
    const setConversationState = this.setConversationState;
    CreateConversation({
      authToken,
      conversation: {
        user_id: user.id,
        business_id: business.id,
      }
    }).then(response => {
      const { conversation } = response;
      setConversationState(conversation);
    }).catch(error => {
      console.error(error);
      this.setState({
        errorOccurred: true,
        errorMessage: 'Error creating conversation',
      })
    })
  }

  setConversationState = (conversation) => {
    this.setState({
      redirectToConversationsPage: true,
      conversation: conversation,
    });
  }

  handleBlockClick = (id) => {
    const { blockDancer, onBlockClick } = this.props;
    blockDancer(id);
    if (onBlockClick) {
      onBlockClick(id);
    }
  }

  render() {
    const {
      show,
      dancer,
    } = this.props;

    const {
      redirectToConversationsPage,
      conversation,
    } = this.state;

    if (redirectToConversationsPage) {
      return (
        <Redirect to={{
            pathname: Routes.conversations.path,
            state: { conversation }
          }}
        />
      );
    }

    return (
      <Modal
        show={show}
        handleClose={this.closeModal}
      >
        {dancer &&
          <S.Grid>
            <S.CarouselArea>
              <Carousel
                showStatus={false}
                infiniteLoop={false}
                centerMode={false}
              >
                {dancer.images ? (
                  dancer.images.map((img, i) => (
                    <S.ImgContainer key={i}>
                      <img
                        src={img.medium}
                        alt={`${dancer.name} (${i} of ${dancer.images.length})`}
                      />
                    </S.ImgContainer>
                  ))
                ) : (
                  <S.ImgContainer>
                    <img
                      src={defaultUserPic}
                      alt={dancer.name}
                    />
                  </S.ImgContainer>
                )}
              </Carousel>
            </S.CarouselArea>
            <S.TitleArea>
              <S.Name>{dancer.name}</S.Name>
              <S.Subtitle>
                <S.Location>
                  {dancer.locations && dancer.locations.length > 0 && (
                    `${dancer.locations[0].city}, ${dancer.locations[0].state}`
                  )}
                </S.Location>
                { /* add this back */ }
              </S.Subtitle>
            </S.TitleArea>
            <S.BioArea>
              <Scroll>
                <S.Text>{dancer.bio}</S.Text>
              </Scroll>
            </S.BioArea>
            <S.StylesArea>
              <S.Title>Style</S.Title>
              {(dancer.profile_options || []).map(opt => (
                opt.selected === true &&
                  <S.Text key={opt.id}>
                    {opt.name}
                  </S.Text>
              ))}
            </S.StylesArea>
            { /*
              TODO: reincorporate this
            <S.RatingsArea>
              <S.Title>Employer's Ratings</S.Title>
              <EmployerRatings
                professionalismRating={4}
                stagePresenceRating={4}
                appearanceRating={4.5}
              />
            </S.RatingsArea>
            */ }
            <S.ActionsArea>
              {this.props.showMessageButton &&
                <Btn.LightPurple.Filled
                  onClick={() => this.messageUser(dancer)}
                >
                  <MdChatBubble size="15" color="white" />
                  &nbsp;
                  Message
                </Btn.LightPurple.Filled>}
              {/*<Btn.Red
                onClick={() => this.handleBlockClick(dancer.id)}
              >
                <MdBlock size="15" color="white" />
                &nbsp;
                Block
              </Btn.Red>
              */}
            </S.ActionsArea>
          </S.Grid>}
      </Modal>
    )
  }
}

const mapStateToProps = state => {
  return {
    authToken: authTokenSelector(state),
    business: businessSelector(state),
  }
}

export default connect(
  mapStateToProps,
  { blockDancer }
)(DancerModal);
