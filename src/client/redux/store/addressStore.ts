import { createStore } from 'redux'
import addressReducer from '../reducers/AddressReducer'

const AddressStore = createStore(addressReducer)

export default AddressStore