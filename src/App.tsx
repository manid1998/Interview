import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
function App() {
  const [state, setState] = useState({
    country: '',
    state: '',
    city: ''
  });
  const [dropdown, setDropDown] = useState([]);
  const [stateDropdown, setStateDropdown] = useState([]);
  const [cityDropDown, setCityDropDown] = useState([]);
  const [disable, setDisable] = useState(false);
  const [imageURL, setImgurl] = useState('http://openweathermap.org/img/w/');
  const [error, setError] = useState('');
  const [weatherDetails, setweatherDetails] = useState({
    country: '', state: '', temp: '',
    iconCode: '',
    city: '', value: false
  });
  useEffect(() => {
    let accessToken = '';
    axios.get('https://www.universal-tutorial.com/api/getaccesstoken', {
      headers: {
        "Accept": "application/json",
        "api-token": "boFIBYTiR-0tJ6XhLeGDdGUFsDVIu3mlgzBVOaeYE4RqGkJdQ5AFdwrfX13hRwOspVE",
        "user-email": "manidhar.syv1997@gmail.com"
      }
    }).then(
      res => {
        console.log(res.data)
        accessToken = res.data.auth_token;
        axios.get('https://www.universal-tutorial.com/api/countries/', {
          headers: {
            "Authorization": "Bearer " + accessToken,
            "Accept": "application/json"
          }
        }).then(
          res => {
            setDropDown(res.data);
          }
        ).catch(
          error => {
            console.log(error);
          }
        )
      }
    ).catch(
      error => {
        console.log(error);
      }
    )

  }, [])
  useEffect(() => {
    if (state.country) {
      setState({ ...state, city: '', state: '' });
      if (dropdown.some(((value: any) => value.country_name.toLowerCase() === state.country.toLowerCase()))) {
        console.log('Here')
        {
          let accessToken = '';
          axios.get('https://www.universal-tutorial.com/api/getaccesstoken', {
            headers: {
              "Accept": "application/json",
              "api-token": "boFIBYTiR-0tJ6XhLeGDdGUFsDVIu3mlgzBVOaeYE4RqGkJdQ5AFdwrfX13hRwOspVE",
              "user-email": "manidhar.syv1997@gmail.com"
            }
          }).then(
            res => {
              console.log(res.data)
              accessToken = res.data.auth_token;
              axios.get('https://www.universal-tutorial.com/api/states/' + state.country, {
                headers: {
                  "Authorization": "Bearer " + accessToken,
                  "Accept": "application/json"
                }
              }).then(
                res => {
                  setStateDropdown(res.data);
                }
              ).catch(
                error => {
                  console.log(error);
                  setStateDropdown([]);
                }
              )
            }
          ).catch(
            error => {
              console.log(error);
            }
          )

        }
      }
    }
  }, [state.country]);

  useEffect(() => {
    if (state.state) {
      setState({ ...state, city: '' });
      if (stateDropdown.some(((value: any) => value.state_name.toLowerCase() === state.state.toLowerCase()))) {
        let accessToken = '';
        axios.get('https://www.universal-tutorial.com/api/getaccesstoken', {
          headers: {
            "Accept": "application/json",
            "api-token": "boFIBYTiR-0tJ6XhLeGDdGUFsDVIu3mlgzBVOaeYE4RqGkJdQ5AFdwrfX13hRwOspVE",
            "user-email": "manidhar.syv1997@gmail.com"
          }
        }).then(
          res => {
            console.log(res.data)
            accessToken = res.data.auth_token;
            axios.get('https://www.universal-tutorial.com/api/cities/' + state.state, {
              headers: {
                "Authorization": "Bearer " + accessToken,
                "Accept": "application/json"
              }
            }).then(
              res => {
                setCityDropDown(res.data);
              }
            ).catch(
              error => {
                console.log(error);
                setCityDropDown([]);
              }
            )
          }
        ).catch(
          error => {
            console.log(error);
          }
        )
      }
    }
  }, [state.state]);

  const handleChange = (event: any) => {
    setState({ ...state, [event.target.name]: event.target.value });
  }
  const getWeather = (callback: any) => {
    setError('');
    if (stateDropdown.some(((value: any) => value.state_name.toLowerCase() === state.state.toLowerCase())) &&
      cityDropDown.some(((value: any) => value.city_name.toLowerCase() === state.city.toLowerCase())) &&
      dropdown.some(((value: any) => value.country_name.toLowerCase() === state.country.toLowerCase()))) {
      axios.get('http://api.openweathermap.org/data/2.5/weather?q=' + state.city + '&units=metric&APPID=4a7d8622a182f50275105485a97c2fbd').then(
        res => {
          let temp = {
            country: '',
            temp: '',
            state: '',
            city: '',
            iconCode: '',
            value: true
          }
          temp.temp = res.data['main'].temp;
          temp.country = state.country;
          temp.state = state.state;
          temp.city = state.city;
          temp.iconCode = res.data['weather'][0].icon;
          var iconurl = "http://openweathermap.org/img/w/" + temp.iconCode + ".png";
          document.getElementById('wicon')?.setAttribute('src', iconurl);
          setImgurl(iconurl);
          setweatherDetails(temp);
        }
      ).catch(
        error => {
          setError('City Not Found')
          setweatherDetails({
            country: 'Not Found',
            state: '',
            city: '',
            temp: 'Not Found',
            iconCode: '',
            value: false
          });
        }
      )
    } else {
      setError('Please! give appropriate details');
    }

  }
  return (
    <div className="App">
      <div>
        <label >Country :</label>
        <input type='text' value={state.country} onChange={handleChange} list="Countries" name='country' />
        <datalist id="Countries">
          {
            dropdown ? dropdown.map((value: any) => <option key={value.country_phone_code} value={value.country_name} />) : null
          }
        </datalist>
      </div>
      <div>
        <label >State :</label>
        <input type='text' value={state.state} onChange={handleChange} name='state' list="States" />
        <datalist id="States">
          {
            stateDropdown ? stateDropdown.map((value: any) => <option key={value.state_name} value={value.state_name} />) : null
          }
        </datalist>
      </div>
      <div>
        <label >City :</label>
        <input type='text' value={state.city} onChange={handleChange} name='city' list="Cities" />
        <datalist id="Cities">
          {
            cityDropDown ? cityDropDown.map((value: any) => <option key={value.city_name} value={value.city_name} />) : null
          }
        </datalist>
      </div>
      <button className="btn btn-success" onClick={() => { getWeather(setweatherDetails) }} >Get Weather</button>
      <div>

        {weatherDetails.value ?
          'The Current Temperature in ' + weatherDetails.country + ' ,' + weatherDetails.state + ' ,' + weatherDetails.city + ' is ' + weatherDetails.temp + 'C' : null}
        {weatherDetails.value ? <img id='wicon' src={imageURL} /> : null}
        {error ? <p>{error}</p> : null}
      </div>
    </div>
  );
}

export default App;