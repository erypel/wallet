import React from 'react'

class Dropdown extends React.PureComponent {

    constructor(props) {
        super(props)
        this.state = {
            listOpen: false,
            headerTitle: this.props.title
        }
    }

    showDropdown = () => {
        this.setState({
            listOpen: true
        })
        document.addEventListener("click", this.hideDropdown);
    }

    hideDropdown = () => {
        this.setState({
            listOpen: false
        })
        document.removeEventListener("click", this.hideDropdown);
    }

    selectItem = (value) => {
        if (this.state.headerTitle !== value) {
            this.setState({
                headerTitle: value
            })
        }
    }

    renderDropdownData = (item, index) => {
        const { title } = item
        return <li key={index} onClick={() => this.selectItem(title)}>
            {title}
        </li>
    }

    render() {
        const { list } = this.props
        const { listOpen, headerTitle } = this.state
        return (<div>
            <div onClick={this.showDropdown}>
                {headerTitle}
                {listOpen
                    ? <label>^</label>
                    : <label>v</label>
                }
            </div>
            <div>
                {listOpen && <ul>
                    {list.map(this.renderDropdownData)}
                </ul>}
            </div>
        </div>
        )
    }
}
export default Dropdown