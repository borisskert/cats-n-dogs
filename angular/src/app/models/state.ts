export interface StateVersion {
  action: {
    type: 'CREATE' | 'UPDATE' | 'DELETE';
    store: string;
    id: string;
  };
  timestamp: Date;
  id: string;
}

/*
*     {
        "action": {
            "type": "CREATE",
            "store": "cat",
            "id": "5c9769236df0983e8a751214"
        },
        "timestamp": "2019-03-24T12:25:23.937",
        "id": "5c9769236df0983e8a751215"
    },
* */
