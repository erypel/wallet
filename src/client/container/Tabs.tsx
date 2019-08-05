import React from 'react'
import Tab from '../component/Tab'

interface TabsProps {
    children: JSX.Element[]
    onTabSwitch?: () => void
}

interface TabsState {
    activeTab: string
}

class Tabs extends React.PureComponent<TabsProps, TabsState> {
    constructor(props: TabsProps) {
        super(props)

        this.state = {
            activeTab: props.children[0].props['data-label']
        }
    }

    onClickTabItem = (label: string) => {
        const { state, props } = this
        const { onTabSwitch } = props
        if(onTabSwitch && label !== state.activeTab) {
            onTabSwitch()
        }
        this.setState({ activeTab: label })
    }

    render() {
        const {
            onClickTabItem,
            props: {
                children
            },
            state: {
                activeTab
            }
        } = this
        return <div className='tabs'>
            <ol className='tab-list'>
                {children.map((child) => {
                    const label = child.props['data-label']

                    return <Tab
                                activeTab={activeTab}
                                key={label}
                                label={label}
                                onClick={onClickTabItem}
                            />
                })}
            </ol>
            <div className='tab-content'>
                {children.map((child) => {
                    if (child.props['data-label'] !== activeTab) return undefined
                    return child.props.children
                })}
            </div>
        </div>
    }
}

export default Tabs