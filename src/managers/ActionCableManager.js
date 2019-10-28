import ActionCable from 'actioncable';

export default class ActionCableManager {
  constructor(base_url, token) {
    var endPoint = 'ws://' + base_url + '/cable?auth_token=' + token;
    this.cable = ActionCable.createConsumer(endPoint);
    this.subscriptions = [];
  }

  subscribe = (channel, data, methods) => {
    var sub = this.cable.subscriptions.create(
      {
        channel: channel,
        data: data
      },
      methods
    );
    this.subscriptions.push(sub);
    return sub;
  };
}
