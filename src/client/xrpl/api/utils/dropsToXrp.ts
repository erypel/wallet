import api from './apiConnector'

export default function dropsToXrp(drops: string): string {
    return api.dropsToXrp(drops)
}