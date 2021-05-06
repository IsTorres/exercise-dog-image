import React, { Component } from 'react';

class Dogs extends Component {
  constructor() {
    super()

    this.state = {
      dog: '',
      loading: true,
      dogArray: [],
    }

    this.newRandonDog = this.newRandonDog.bind(this);
    this.fetchDogs = this.fetchDogs.bind(this);
    this.renderDog = this.renderDog.bind(this);
  }
  
  async fetchDogs() {
    this.setState(
      { loading: true }, // primeiro param da setState() - uma att de state 
      async () => {
        const resquestReturn = await fetch('https://dog.ceo/api/breeds/image/random');
        const requestObj = await resquestReturn.json();
        const { message } = requestObj;
        this.setState({
          loading: false,
          dog: message,
        })
      }
    )
  }

  // componentDidMount é um otimo lugar para farzer requisições!
  componentDidMount() {
    this.fetchDogs();
  }

  newRandonDog() {
    this.setState(({ dogArray, dog }) => ({
      dogArray: [...dogArray, dog],
    }))
    this.fetchDogs();
  }

  renderDog() {
    return (
      <div className="App">
        <div>
          <img src={ this.state.dog } className="new-dog-card" />
        </div>
        <button type="button" onClick={ this.newRandonDog }>New Dog</button>
      </div>
    )
  }

  render() {
    const { dogArray, dog, loading } = this.state
    const loadingando = <span>Loadingando...</span>

    return (
      <section>
        <div>
          { dogArray.map((dog) => <img src={ dog } key={ dog } className="dog-card" />) }
        </div>
        { loading ? loadingando : this.renderDog() }
      </section>
    )
  }
}

export default Dogs;