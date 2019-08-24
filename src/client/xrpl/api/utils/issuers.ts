export type IssuerCurrency = keyof Issuers & string

export interface Issuers {
    'BTC': string[],
    'CNY': string[],
    'ETH': string[],
    'EUR': string[],
    'GBP': string[],
    'JPY': string[],
    'KRW': string[],
    'USD': string[],
    'XAG': string[],
    'XAU': string[],
    'XYZ': string[],
    'XRP': []
    [key:string]: any
}

export const issuers: Issuers = {
    'BTC': ['rvYAfWj5gh67oV6fW32ZzP3Aw4Eubs59B'],
    'CNY': ['rKiCet8SdvWxPXnAgYarFUXMh1zCPz432Y'],
    'ETH': ['rcA8X3TVMST1n3CJeAdGk1RdRCHii7N2h'],
    'EUR': ['rhub8VRN55s94qWKDv6jmDy1pUykJzF3wq'],
    'GBP': ['rBycsjqxD8RVZP5zrrndiVtJwht7Z457A8'],
    'JPY': ['r9ZFPSb1TFdnJwbTMYHvVwFK1bQPUCVNfJ'],
    'KRW': ['rPxU6acYni7FcXzPCMeaPSwKcuS2GTtNVN'],
    'USD': ['rhub8VRN55s94qWKDv6jmDy1pUykJzF3wq', 'rvYAfWj5gh67oV6fW32ZzP3Aw4Eubs59B'],
    'XAG': ['r9Dr5xwkeLegBeXq6ujinjSBLQzQ1zQGjH'],
    'XAU': ['r9Dr5xwkeLegBeXq6ujinjSBLQzQ1zQGjH'],
    'XYZ': ['rGcVnVr5ZZaZ59jnk5VmXsHgGgG8XUaMRQ'],
    'XRP': []
};

export const issuerNames = {
    'rvYAfWj5gh67oV6fW32ZzP3Aw4Eubs59B':'Bitstamp',
    'rhub8VRN55s94qWKDv6jmDy1pUykJzF3wq':'Gatehub',
    'rKiCet8SdvWxPXnAgYarFUXMh1zCPz432Y':'Ripplefox',
    'rcA8X3TVMST1n3CJeAdGk1RdRCHii7N2h':'Gatehub Fifth',
    'rBycsjqxD8RVZP5zrrndiVtJwht7Z457A8':'Ripula',
    'r9ZFPSb1TFdnJwbTMYHvVwFK1bQPUCVNfJ':'Ripple Exch Tokyo',
    'rPxU6acYni7FcXzPCMeaPSwKcuS2GTtNVN':'EXRP',
    'r9Dr5xwkeLegBeXq6ujinjSBLQzQ1zQGjH':'Ripple Singapore',
    'rDVdJ62foD1sn7ZpxtXyptdkBSyhsQGviT':'Ripple Dividend',
    'rGcVnVr5ZZaZ59jnk5VmXsHgGgG8XUaMRQ': 'Testing'
};