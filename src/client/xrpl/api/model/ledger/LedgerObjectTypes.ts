import AccountRoot from './AccountRoot'
import RippleState from './RippleState'
import Offer from './Offer'
import Amendments from './Amendments'
import Check from './Check'
import DepositPreauth from './DepositPreauth'
import DirectoryNode from './DirectoryNode'
import Escrow from './Escrow'
import FeeSettings from './FeeSettings'
import LedgerHashes from './LedgerHashes'
import PayChannel from './PayChannel'
import SignerList from './SignerList'

export  type LedgerObjectTypes = AccountRoot | Amendments | Check | DepositPreauth 
    | DirectoryNode | Escrow | FeeSettings | LedgerHashes | Offer | PayChannel 
    | RippleState | SignerList