import Button from  './Button'
import React from  'react'

interface Props {
    title: string
    children: JSX.Element[]
    className?: string
    menuItemsClassName?: string
}

interface State {
    showMenu: boolean
}

export default class Menu extends React.PureComponent<Props, State> {
    constructor(props: Props) {
        super(props)
        
        this.state = {
            showMenu: false
        }
    }

    openMenu = () => {
        this.setState({
            showMenu: true
        }, () => {
            document.addEventListener('click', this.closeMenu)
        })
    }

    closeMenu = () => {
        this.setState({
            showMenu: false
        }, () => {
            document.removeEventListener('click', this.closeMenu)
        })
    }

    render() {
        const { title, children, menuItemsClassName, className } = this.props
        const { showMenu } = this.state
        return <div className={className}>
            <Button onClick={this.openMenu} buttonText={title}/>
            {showMenu && <div className={menuItemsClassName}>
                {children}
            </div>}
        </div>
    }
}