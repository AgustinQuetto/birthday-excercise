import React from 'react'
import CountriesSelect from './components/countriesSelect'
import UsersTable from './components/usersTable'

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      users : [],
      countries: [],
      formData: {
        firstName: '',
        lastName: '',
        country: '',
        birthday: '',
        day: 0,
        month: 0,
        year: 0
      },
      message: ''
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  componentWillMount() {
    if (localStorage.getItem('users') != null) {
      let cachedUsers = []
      cachedUsers.push(JSON.parse(localStorage.getItem('users')))

      let newUsers = []
      cachedUsers.map((user) => {
        return newUsers.push({
                firstName: user.firstName,
                lastName: user.lastName,
                country: user.country,
                day: parseInt(user.day, 0),
                month: parseInt(user.month, 0),
                year: parseInt(user.year, 0)
              })
      })

      this.setState({ users: newUsers })
      console.log(this.state.users)
    } else {
      this.setState({ users: [] })
      console.log(this.state.users)
    }
  }

  onSubmit(event){
    let newUsers = this.state.users
    let data = this.state.formData
    let birthdayData = this.state.formData.birthday.split('-')
    
    delete data.birthday

    data.day = birthdayData[2]
    data.month = birthdayData[1]
    data.year = birthdayData[0]

    newUsers.push(data)
    this.setState({users : newUsers})
    localStorage.setItem('users', JSON.stringify(newUsers[newUsers.length-1]));
    this.calculateBirthday(newUsers[newUsers.length-1])
  }

  handleInputChange(e) {
    let formData = Object.assign({}, this.state.formData)
    formData[e.target.name] = e.target.value
    this.setState({formData})
  }
  
  calculateBirthday(obj){
    let d = new Date()
    let yearsBirthday

    if (obj.day <= d.getDay() && obj.month <= d.getMonth())
      yearsBirthday = d.getFullYear() - obj.year + 1
    else 
      yearsBirthday = d.getFullYear() - this.state.formData.year

    let newMessage = `Hello ${obj.firstName} ${obj.lastName} from ${obj.country}. From ${obj.day} on ${obj.month} you will have ${yearsBirthday}.`
    this.setState({
      message: newMessage
    })
  }

  render() {
    return (
    <div>
        <h1>Intive - FDV Excercise</h1>
        <div className="container">
          <div className="container-form">
            <form onChange={this.handleInputChange}>
              <div>
                <label for="firstName">Firstname:</label>
                <input type="text" placeholder="firstname here" name="firstName"/>
              </div>
              <div>
               <label for="lastname">Lastname:</label>
               <input type="text" placeholder="lastname here" name="lastName"/>
              </div>
              <div>
                <label for="country">Country:</label>
                <CountriesSelect countries={this.state.countries}/>
              </div>
              <div>
                <label for="birthday">Birthday:</label>
                <input type="date" name="birthday"/>
              </div>
              <input type="button" value="Save" onClick={this.onSubmit}/>
            </form>
            {this.state.message &&
              <div className="message">
                {this.state.message}
              </div>
            }
          </div>
          <div className="container-table">
            <UsersTable users={this.state.users}/>
          </div>
        </div>
        <h2>Agustín Ramiro Quetto Garay Lima</h2>
      </div>
    )
  }
}

export default App
