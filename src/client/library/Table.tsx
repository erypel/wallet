import React from 'react'
import './Table.css'

//Based off of https://github.com/ua-oira/react-super-responsive-table
const { Provider, Consumer } = React.createContext({})

interface State {
    headers: {}
}

interface Props {
    className?: string,
    headers?: any,
    inHeader?: boolean,
    colSpan?: number,
    children?: any,
    columnKey?: string
}

const omit = (obj: any, omitProps: string[]) =>
  Object.keys(obj)
    .filter(key => omitProps.indexOf(key) === -1)
    .reduce((returnObj, key) => ({ ...returnObj, [key]: obj[key] }), {})

const allowed = (props: Props) => omit(props, ['inHeader', 'columnKey', 'headers'])


export class Table extends React.PureComponent<Props, State> {
    constructor(props: Props) {
      super(props)
      this.state = {
        headers: {},
      }
    }
    render() {
      const { headers } = this.state
      const classes = (this.props.className || '') + ' responsiveTable'
      return (
        <Provider value={headers}>
          <table {...allowed(this.props)} className={classes} />
        </Provider>
      )
    }
  }
export const Thead = (props: Props) => (
    <thead {...allowed(props)}>
      {React.cloneElement(props.children, { inHeader: true })}
    </thead>
  )
  
  class TrInner extends React.PureComponent<Props> {
    constructor(props: Props) {
      super(props)
      const { headers } = props
      if (headers && props.inHeader) {
        React.Children.map(props.children, (child, i) => {
          if (child) {
            headers[i] = child.props.children
          }
        })
      }
    }
    render() {
      const { children } = this.props
      return (
        <tr {...allowed(this.props)}>
          {children &&
            React.Children.map(
              children,
              (child, i) =>
                child &&
                React.cloneElement(child, {
                  key: i,
                  columnKey: i,
                })
            )}
        </tr>
      )
    }
  }
  
  export const Tr = (props: Props) => (
    <Consumer>{headers => <TrInner {...props} headers={headers} />}</Consumer>
  )
  
  export const Th = (props: Props) => <th {...allowed(props)} />
  export const Tbody = (props: Props) => <tbody {...allowed(props)} />
  
  class TdInner extends React.PureComponent<Props> {
    render() {
      if (this.props.colSpan) {
        return <td {...allowed(this.props)} />
      }
      const { headers, children, columnKey } = this.props
      const classes = (this.props.className || '') + ' pivoted'
      return (
        <td className={classes}>
          <div className="tdBefore">{columnKey && headers[columnKey]}</div>
          {children !== undefined ? children : <div>&nbsp;</div>}
        </td>
      )
    }
  }
  
  export const Td = (props: Props) => (
    <Consumer>{headers => <TdInner {...props} headers={headers} />}</Consumer>
  )