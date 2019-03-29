export interface StateVersion {
  action: {
    type: 'CREATE' | 'UPDATE' | 'DELETE';
    store: string;
    id: string;
  };
  timestamp: Date;
  id: string;
}
