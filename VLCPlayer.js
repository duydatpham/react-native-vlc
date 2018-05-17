import React from 'react'
import ReactNative from 'react-native'
import PropTypes from 'prop-types'

const {
  Component
} = React

const {
  StyleSheet,
  requireNativeComponent,
  View,
  NativeModules,
  Dimensions,
  Platform
} = ReactNative

const VLCKPlayerManager = NativeModules.VLCPlayerManager || NativeModules.VLCPlayerModule
let { scale } = Dimensions.get('window');
export default class VLCPlayer extends Component {
  constructor(props, context) {
    super(props, context)
    this.seek = this.seek.bind(this)
    this.snapshot = this.snapshot.bind(this)
    this._assignRoot = this._assignRoot.bind(this)
    this._onError = this._onError.bind(this)
    this._onProgress = this._onProgress.bind(this)
    this._onEnded = this._onEnded.bind(this)
    this._onPlaying = this._onPlaying.bind(this)
    this._onStopped = this._onStopped.bind(this)
    this._onPaused = this._onPaused.bind(this)
    this._onBuffering = this._onBuffering.bind(this)
    this._onVolumeChanged = this._onVolumeChanged.bind(this)
  }

  setNativeProps(nativeProps) {
    this._root.setNativeProps(nativeProps)
  }

  play() {
    this.setNativeProps({ paused: false })
  }

  pause() {
    this.setNativeProps({ paused: true })
  }

  seek(pos) {
    this.setNativeProps({ seek: pos })
  }

  snapshot(path) {
    this.setNativeProps({ snapshotPath: path })
  }

  _assignRoot(component) {
    this._root = component
  }

  _onBuffering(event) {
    if (this.props.onVLCBuffering) {
      this.props.onVLCBuffering(event.nativeEvent)
    }
  }

  _onError(event) {
    if (this.props.onVLCError) {
      this.props.onVLCError(event.nativeEvent)
    }
  }

  _onProgress(event) {
    if (this.props.onVLCProgress) {
      this.props.onVLCProgress(event.nativeEvent)
    }
  }

  _onEnded(event) {
    if (this.props.onVLCEnded) {
      this.props.onVLCEnded(event.nativeEvent)
    }
  }

  _onStopped(event) {
    this.setNativeProps({ paused: true })
    if (this.props.onVLCStopped) {
      this.props.onVLCStopped(event.nativeEvent)
    }
  }

  _onPaused(event) {
    if (this.props.onVLCPaused) {
      this.props.onVLCPaused(event.nativeEvent)
    }
  }

  _onPlaying(event) {
    if (this.props.onVLCPlaying) {
      this.props.onVLCPlaying(event.nativeEvent)
    }
  }

  _onVolumeChanged(event) {
    if (this.props.onVLCVolumeChanged) {
      this.props.onVLCVolumeChanged(event.nativeEvent)
    }
  }

  componentWillUnmount() {
    VLCKPlayerManager.releaseView()
  }


  resize(size) {
    this.setNativeProps({ resize: size })
  }

  getStyleWidth(props) {
    if (!props)
      return undefined
    for (let i = 0; i < props.length; i++) {
      if (props[i].width != undefined || props[i].height != undefined) {
        return props[i]
      }
    }

    return undefined
  }

  componentWillReceiveProps(nextProps) {
    if (Platform.OS == 'android') {
      try {
        let currentPropsStyle = this.getStyleWidth(this.props.style)
        let nextPropsStyle = this.getStyleWidth(nextProps.style)
        if (currentPropsStyle.width != nextPropsStyle.width || currentPropsStyle.height != nextPropsStyle.height) {
          this.resize({ width: (nextPropsStyle.width || 0) * scale, height: (nextPropsStyle.height || 0) * scale })
        }
      } catch (error) {

      }
    }
  }

  render() {
    const {
      source
    } = this.props
    source.initOptions = source.initOptions || []
    // repeat the input media
    const nativeProps = Object.assign({}, this.props)
    Object.assign(nativeProps, {
      style: [styles.base, nativeProps.style],
      source: source,
      onVLCError: this._onError,
      onVLCProgress: this._onProgress,
      onVLCEnded: this._onEnded,
      onVLCPlaying: this._onPlaying,
      onVLCPaused: this._onPaused,
      onVLCStopped: this._onStopped,
      onVLCBuffering: this._onBuffering,
      onVLCVolumeChanged: this._onVolumeChanged
    })

    return (
      <RCTVLCPlayer ref={this._assignRoot} {...nativeProps} />
    )
  }
}

VLCPlayer.propTypes = {
  /* Wrapper component */
  source: PropTypes.object,

  /* Native only */
  paused: PropTypes.bool,
  seek: PropTypes.number,
  resize: PropTypes.object,
  rate: PropTypes.number,
  volume: PropTypes.number,
  snapshotPath: PropTypes.string,

  onVLCPaused: PropTypes.func,
  onVLCStopped: PropTypes.func,
  onVLCBuffering: PropTypes.func,
  onVLCPlaying: PropTypes.func,
  onVLCEnded: PropTypes.func,
  onVLCError: PropTypes.func,
  onVLCProgress: PropTypes.func,
  onVLCVolumeChanged: PropTypes.func,

  /* Required by react-native */
  scaleX: PropTypes.number,
  scaleY: PropTypes.number,
  translateX: PropTypes.number,
  translateY: PropTypes.number,
  rotation: PropTypes.number,
  ...View.propTypes
}

const styles = StyleSheet.create({
  base: {
    overflow: 'hidden'
  }
})
const RCTVLCPlayer = requireNativeComponent('RCTVLCPlayer', VLCPlayer)
