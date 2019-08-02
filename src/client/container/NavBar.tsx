import React from 'react'
import Menu from '../component/Menu'
import LogOutButton from './LogOutButton'
import { history } from '../utils/history'
import Button from '../component/Button'
import { connect } from 'react-redux'

interface Props {
    loggedIn: boolean
}

class NavBar extends React.PureComponent<Props> {
    render() {
        if(!this.props.loggedIn) {
            return null
        }
        return <div className='navigation'>
        <Menu title="Menu" menuItemsClassName={'navigation-items'}>
            <Button buttonText='Wallets' onClick={() => history.push('/home')}/>
            <br/>
            <Button buttonText='Profile' onClick={() => history.push('/profile')}/>
            <br/>
            <Button buttonText='Trader' onClick={() => history.push('/trade')}/>
            <br/>
            <LogOutButton/>
        </Menu>
    </div>
    }
}

const mapStateToProps = (store: any) => {
    return {
        loggedIn: store.login.loggedIn
    }
}

export default connect(mapStateToProps)(NavBar)