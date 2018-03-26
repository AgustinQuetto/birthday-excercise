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
        country: 'Afghanistan',
        birthday: '',
        day: 0,
        month: 0,
        year: 0
      },
      translate: {},
      message: '',
      value: ''
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  componentWillMount () {
    let language

    if (this.isRevisited() && localStorage.getItem('users') != null) {
      let notAuthed = true
      let hash = '$2a$10$96FujQkdOJpRoTOwH1AhROWIFwwCLrhpNLPQhTGtqev8e.NMm2Lt2'
      
      do{
        if (bcrypt.compareSync(prompt("Enter an auth key for view old entries"), hash))
          notAuthed = false

      } while (notAuthed)

      let newUsers = []
      JSON.parse(localStorage.getItem('users')).map((user) => {
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
    } else {
      this.setState({ users: [] })
    }
    language = this.getLanguage()
    this.setState({
      translate: language
    })
  }

  handleInputChange (e) {
    let formData = Object.assign({}, this.state.formData)
    formData[e.target.name] = e.target.value
    this.setState({formData})
  }

  handleChangeValue = e => {
    this.calculateBirthday(this.state.users[e.target.id])
  }

  getLanguage () {
    const url = (window.location.href).split('/')
    let translate = {}
    switch(url[3]) {
      case 'es': translate = { lang: 'es', name: 'Nombre', firstName: 'Nombre', lastName: 'Apellido', country: 'País', birthday: 'Cumpleaños', here: 'aquí', save: 'Guardar' }
        break
      case 'br': translate = { lang: 'br', name: 'Nome', firstName: 'Nome', lastName: 'Apelido', country: 'País', birthday: 'Aniversário', here: 'aqui', save: 'Salvar' }
        break
      default: translate = { lang: 'en', name: 'Name', firstName: 'Firstname', lastName: 'Lastname', country: 'Country', birthday: 'Birthday', here: 'here', save: 'Guardar' }
        break
    }

    return translate
  }

  isRevisited () {
    const url = (window.location.href).split('/')
    return url[3] === 'revisited' ?  true :  false
  }

  stringFormat (data) {
    return data.replace(/(^|\s)\S/g, (l) => { return l.toUpperCase() })
  }

  onSubmit (event) {
    let newUsers = this.state.users
    let data = this.state.formData
    let birthdayData = this.state.formData.birthday.split('-')
    
    delete data.birthday

    data.firstName = this.stringFormat(data.firstName)
    data.lastName = this.stringFormat(data.lastName)
    data.day = parseInt(birthdayData[2], 0)
    data.month = parseInt(birthdayData[1], 0)
    data.year = parseInt(birthdayData[0], 0)

    newUsers.push(data)
    this.setState({users : newUsers})
    localStorage.setItem('users', JSON.stringify(newUsers))
    this.calculateBirthday(newUsers[newUsers.length-1])

    const clear = {
      firstName: '',
      lastName: '',
      country: 'Afghanistan',
      birthday: '',
      day: 0,
      month: 0,
      year: 0
    }

    this.setState({formData : clear})

  }
  
  calculateBirthday (obj) {
    let d = new Date()
    let yearsBirthday
    let newMessage

    if (obj.day <= d.getDay() && obj.month <= d.getMonth())
      yearsBirthday = d.getFullYear() - obj.year + 1
    else 
      yearsBirthday = d.getFullYear() - obj.year

    switch(this.state.translate.lang) {
      case 'es': newMessage = `Hola ${obj.firstName} ${obj.lastName} desde ${obj.country}. Desde el ${obj.day} del ${obj.month} tendrás ${yearsBirthday}.`
        break;

      case 'br': newMessage = `Olá ${obj.firstName} ${obj.lastName} da ${obj.country}. A partir de ${obj.day} de ${obj.month} você terá ${yearsBirthday}.`
        break;

      default: newMessage = `Hello ${obj.firstName} ${obj.lastName} from ${obj.country}. From ${obj.day} on ${obj.month} you will have ${yearsBirthday}.`
        break;
    }

    return this.setState({
      message: newMessage
    })
  }

  render () {
    return (
    <div>
        <h1>Intive - FDV Excercise</h1>
        <div className="container">
          <div className="container-form">
            <form onChange={this.handleInputChange}>
              <div>
                <label htmlFor="firstName">{this.state.translate.firstName}:</label>
                <input type="text" placeholder={this.state.translate.firstName+' '+this.state.translate.here} name="firstName" value={this.state.formData.firstName}/>
              </div>
              <div>
               <label htmlFor="lastname">{this.state.translate.lastName}:</label>
               <input type="text" placeholder={this.state.translate.lastName+' '+this.state.translate.here} name="lastName" value={this.state.formData.lastName}/>
              </div>
              <div>
                <label htmlFor="country">{this.state.translate.country}:</label>
                <CountriesSelect countries={this.state.countries}/>
              </div>
              <div>
                <label htmlFor="birthday">{this.state.translate.birthday}:</label>
                <input type="date" name="birthday" value={this.state.formData.birthday}/>
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
            <UsersTable users={this.state.users} translate={this.state.translate} value={this.state.value} onChangeValue={this.handleChangeValue} />
          </div>
        </div>
        <h2>Agustín Ramiro Quetto Garay Lima</h2>
      </div>
    )
  }
}

export default App
