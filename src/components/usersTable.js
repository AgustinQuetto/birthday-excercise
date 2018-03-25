import React from 'react'

class UsersTable extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
    }
  }
  
  render() {
    let users = this.props.users
    let trUsers = users.map((user) => {
       return (     
              <tr>
                <td>{user.firstName} {user.lastName}</td>
                <td>{user.country}</td>
                <td>{user.day}/{user.month}/{user.year}</td>
              </tr>
            )
          }
        )
    return (
      <table>
        <thead>
          <tr>
            <td>Name</td>
            <td>Country</td>
            <td>Birthday</td>
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