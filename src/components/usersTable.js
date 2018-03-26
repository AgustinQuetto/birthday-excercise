import React from 'react'

class UsersTable extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }

  render () {
    let users = this.props.users
    let trUsers = users.map((user, index) => {
      return (
        <tr>
          <td id={index} onClick={this.props.onChangeValue}>{user.firstName} {user.lastName}</td>
          <td id={index} onClick={this.props.onChangeValue}>{user.country}</td>
          <td id={index} onClick={this.props.onChangeValue}>{user.day}/{user.month}/{user.year}</td>
        </tr>
      )
    }
    )

    return (
      <table>
        <thead>
          <tr>
            <td>{this.props.translate.name}</td>
            <td>{this.props.translate.country}</td>
            <td>{this.props.translate.birthday}</td>
          </tr>
        </thead>
        <tbody>
          {trUsers}
        </tbody>
      </table>
    )
  }
}

export default UsersTable
