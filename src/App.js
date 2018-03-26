import React from 'react'
import CountriesSelect from './components/countriesSelect'
import UsersTable from './components/usersTable'
var bcrypt = require('bcryptjs');

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
      translate: {},
      message: ''

    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  getLanguage(){
    const url = (window.location.href).split('/')
    let translate = {}
    switch(url[3]) {
      case 'es': translate = { lang: 'es', firstName: 'Nombre', lastName: 'Apellido', country: 'País', birthday: 'Cumpleaños', here: 'aquí', save: 'Guardar' }
        break
      case 'br': translate = { lang: 'br', firstName: 'Nome', lastName: 'Apelido', country: 'Country', birthday: 'Aniversário', here: 'aqui', save: 'Salvar' }
        break
      default: translate = { lang: 'en', firstName: 'Firstname', lastName: 'Lastname', country: 'Country', birthday: 'Birthday', here: 'here', save: 'Guardar' }
        break
    }

    return translate
  }

  isRevisited() {
    const url = (window.location.href).split('/')
    return url[3] === 'revisited' ?  true :  false
  }

  componentWillMount() {
    let language

    if (this.isRevisited() && localStorage.getItem('users') != null) {
      let notAuthed = true
      let hash = '$2a$10$96FujQkdOJpRoTOwH1AhROWIFwwCLrhpNLPQhTGtqev8e.NMm2Lt2'
      
      do{
        if (bcrypt.compareSync(prompt("Enter an auth key for view old entries"), hash))
          notAuthed = false

      } while (notAuthed)

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
    language = this.getLanguage()
    this.setState({
      translate: language
    })
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
    let newMessage

    if (obj.day <= d.getDay() && obj.month <= d.getMonth())
      yearsBirthday = d.getFullYear() - obj.year + 1
    else 
      yearsBirthday = d.getFullYear() - this.state.formData.year

    switch(this.state.translate.lang) {
      case 'es': newMessage = `Hola ${obj.firstName} ${obj.lastName} dede ${obj.country}. Desde el ${obj.day} del ${obj.month} tendrás ${yearsBirthday}.`
        break;

      case 'br': newMessage = `Olá ${obj.firstName} ${obj.lastName} da ${obj.country}. A partir de ${obj.day} de ${obj.month} você terá ${yearsBirthday}.`
        break;

      default: newMessage = `Hello ${obj.firstName} ${obj.lastName} from ${obj.country}. From ${obj.day} on ${obj.month} you will have ${yearsBirthday}.`
        break;
    }

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
                <label htmlFor="firstName">{this.state.translate.firstName}:</label>
                <input type="text" placeholder={this.state.translate.firstName+' '+this.state.translate.here} name="firstName"/>
              </div>
              <div>
               <label htmlFor="lastname">{this.state.translate.lastName}:</label>
               <input type="text" placeholder={this.state.translate.lastName+' '+this.state.translate.here} name="lastName"/>
              </div>
              <div>
                <label htmlFor="country">{this.state.translate.country}:</label>
                <CountriesSelect countries={this.state.countries}/>
              </div>
              <div>
                <label htmlFor="birthday">{this.state.translate.birthday}:</label>
                <input type="date" name="birthday"/>
              </div>
              <input type="button" value={this.state.translate.save} onClick={this.onSubmit}/>
            </form>
            {this.state.message &&
              <div className="message">
                {this.state.message}
              </div>
            }
          </div>
          <div className="container-table">
            <UsersTable users={this.state.users} translate={this.state.translate}/>
          </div>
        </div>
        <h2>Agustín Ramiro Quetto Garay Lima</h2>
      </div>
    )
  }
}

export default App
