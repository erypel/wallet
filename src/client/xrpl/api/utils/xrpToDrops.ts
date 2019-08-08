import api from './apiConnector'

export default function xrpToDrops(xrp: string): string {
    return api.xrpToDrops(xrp)
}