import React from 'react'

interface TabProps {
    activeTab: string
    label: string
    onClick: (label: string) => void
}

class Tab extends React.PureComponent<TabProps> {
    onClick = () => {
        const { label, onClick } = this.props
        onClick(label)
    }

    render() {
        const {
            onClick,
            props: {
                activeTab,
                label
            }
        } = this

        var className = 'tab-list-item'
        if (activeTab === label) {
            className += ' tab-list-active'
        }

        return (
            <li
              className={className}
              onClick={onClick}
            >
              {label}
            </li>
          )
    }
}

export default Tab