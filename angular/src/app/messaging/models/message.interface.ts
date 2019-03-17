import * as cuid from 'cuid';

export interface Message {
  id: string;
  text: string;
  type: 'info' | 'warning' | 'error';
  timestamp: Date;
}

export const newInfo = (text: string): Message => {
  return {
    text: text,
    type: 'info',
    id: cuid(),
    timestamp: new Date(),
  };
};

export const newWarning = (text: string): Message => {
  return {
    text: text,
    type: 'warning',
    id: cuid(),
    timestamp: new Date(),
  };
};

export const newError = (text: string): Message => {
  return {
    text: text,
    type: 'error',
    id: cuid(),
    timestamp: new Date(),
  };
};
