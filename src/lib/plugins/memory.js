import os from 'os'
import { drawIcon } from '../utils/icons'

export function memoryFactory(React) {
  return class extends React.Component {
    static displayName() {
      return 'Memory plugin'
    }

    static propTypes() {
      return {
        style: React.PropTypes.object
      }
    }

    constructor(props) {
      super(props)
      this.state = {
        freeMemory: this.calculateFreeMemory(),
        totalMemory: this.getMb(os.totalmem())
      }

      setInterval(() => this.calculateFreeMemory(), 100)
    }

    getMb(bytes) {
      return (bytes / (1024 * 1024)).toFixed(0) + 'MB'
    }

    calculateFreeMemory() {
      const freeMemory = this.getMb(os.freemem())
      this.setState({freeMemory})
      return freeMemory
    }

    render() {
      return (
        <div style={this.props.style}>
          {drawIcon(React, 'memory', this.props.style.color)} {this.state.freeMemory} / {this.state.totalMemory}
        </div>
      )
    }
  }
}
