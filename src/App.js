import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text : 'type here',
      output : null,
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
  }

  handleClick() {
    const uri = 'https://westcentralus.api.cognitive.microsoft.com/text/analytics/v2.0/sentiment';
    const config = {
      headers: {
        'Ocp-Apim-Subscription-Key': '<subcription key here>',
        'Content-Type':'application/json'
      }
    };

    const req_body = {
      'documents' : [
        { 'id': '1', 'language': 'en', 'text': this.state.text },
      ]
    }
    Axios.post(uri, req_body, config).then(
      res =>{
        console.log(res.data)
        this.setState({
          output : res.data
        })
      }
    )
  }

  handleOnChange(event){
    this.setState({
      text: event.target.value
    })
    console.log(this.state.text)
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Sentiment Analysis</h1>
        </header>
        <div>
            <textarea type="text" onChange={this.handleOnChange}/>
            <br />
            <button onClick={this.handleClick}>Analyze!!!</button>
        </div>
        <br />
        <div>
          <p> score : {this.state.output && this.state.output.documents[0].score} </p>
        </div>
      </div>
    );
  }
}

export default App;

