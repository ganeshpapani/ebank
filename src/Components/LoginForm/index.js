import {Component} from 'react'
import Cookies from 'js-cookie'

import './index.css'

class LoginForm extends Component {
  state = {
    userId: '',
    pin: '',
    showSubmitError: false,
    errorMsg: '',
  }

  onChangeInputId = event => {
    this.setState({userId: event.target.value})
  }

  onChangeInputPin = event => {
    this.setState({pin: event.target.value})
  }

  renderUserInputIdFiled = () => {
    const {userId} = this.state

    return (
      <>
        <label className="label-input" htmlFor="InputId">
          User Id
        </label>
        <input
          className="input"
          type="text"
          id="InputId"
          value={userId}
          onChange={this.onChangeInputId}
          placeholder="Enter User ID"
        />
      </>
    )
  }

  renderUserInputPinFiled = () => {
    const {pin} = this.state
    return (
      <>
        <label className="label-input" htmlFor="InputPin">
          User Pin
        </label>
        <input
          className="input"
          id="InputPin"
          value={pin}
          onChange={this.onChangeInputPin}
          placeholder="Enter PIN"
          type="password"
        />
      </>
    )
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
    })
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  submitForm = async event => {
    event.preventDefault()
    const {userId, pin} = this.state

    const userDetails = {userId, pin}
    const url = 'https://apis.ccbp.in/ebank/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {showSubmitError, errorMsg, userId, pin} = this.state

    return (
      <div className="app-container">
        <div className="image-form-container">
          <div className="image-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
              alt="website login"
              className="login-image"
            />
          </div>
          <form className="form-container" onSubmit={this.submitForm}>
            <h1 className="heading"> Welcome Back</h1>
            <div className="input-container">
              {this.renderUserInputIdFiled()}
            </div>
            <div className="input-container">
              {this.renderUserInputPinFiled()}
            </div>
            <button type="submit" className="login-button">
              Login
            </button>
            {showSubmitError && <p className="error-message">*{errorMsg}</p>}
            <h1>{userId}</h1>
            <h1>{pin}</h1>
          </form>
        </div>
      </div>
    )
  }
}

export default LoginForm
