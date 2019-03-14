export interface Message {
  id: string;
  text: string;
  type: 'info' | 'warning' | 'error';
  timestamp: Date;
}
