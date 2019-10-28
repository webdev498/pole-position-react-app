import { BLOCK_DANCER, UNBLOCK_DANCER } from '@actions/types';

export function blockDancer(dancerId) {
  return {
    type: BLOCK_DANCER,
    payload: dancerId,
  }
}

export function unblockDancer(dancerId) {
  return {
    type: UNBLOCK_DANCER,
    payload: dancerId,
  }
}