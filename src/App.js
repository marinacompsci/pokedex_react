import {
  getPokemonList,
  getPokemonDescription,
  getPokemonSpriteUrl
} from "../api/utils";
import "../styles/styles.css";
//import Prompt from "../components/Prompt";
import Card from "../components/Card";
import Select from "../components/Select";
import React from "react";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: null,
      names: null,
      selectedPokemonObject: null,
      prevIsDisabled: false,
      nextIsDisabled: false
    };
    this.getList = this.getList.bind(this);
    this.pokemonSelected = this.pokemonSelected.bind(this);
    this.getPokemonObject = this.getPokemonObject.bind(this);
    this.flipPage = this.flipPage.bind(this);
  }

  getList() {
    getPokemonList().then((data) => {
      const pokemonNames = data.map((pokemon) => pokemon.name);
      this.setState({ list: data, names: pokemonNames });
    });
  }

  getPokemonObject(name) {
    return this.state.list.find((el) => el.name === name);
  }

  pokemonSelected(name) {
    let infoObj = this.getPokemonObject(name);
    let index = this.state.list.indexOf(infoObj);
    let id = index + 1;
    getPokemonDescription(id).then((descr) => {
      const obj = {
        name: infoObj.name,
        url: getPokemonSpriteUrl(id),
        description: descr
      };
      this.setState({ selectedPokemonObject: obj });
    });

    if (index === 0) {
      if (this.state.nextIsDisabled) this.setState({ nextIsDisabled: false });
      this.setState({ prevIsDisabled: true });
    } else if (index === this.state.list.length - 1) {
      if (this.state.prevIsDisabled) this.setState({ prevIsDisabled: false });
      this.setState({ nextIsDisabled: true });
    } else {
      if (this.state.prevIsDisabled) this.setState({ prevIsDisabled: false });
      if (this.state.nextIsDisabled) this.setState({ nextIsDisabled: false });
    }
  }

  flipPage(summand) {
    let id = this.state.list.indexOf(
      this.getPokemonObject(this.state.selectedPokemonObject.name)
    );
    if (summand === -1 && id === 0) {
      // clicking on 'Previous'
      this.setState({ prevIsDisabled: true });
      return;
    } else if (summand === 1 && id === this.state.list.length - 1) {
      // clicking on 'Next'
      this.setState({ nextIsDisabled: true });
      return;
    }

    id += summand;

    console.log("flipage Id: " + id);

    if (this.state.prevIsDisabled) this.setState({ prevIsDisabled: false });
    if (this.state.nextIsDisabled) this.setState({ nextIsDisabled: false });
    this.pokemonSelected(this.state.list[id].name);
  }

  componentDidMount() {
    this.getList();
  }

  render() {
    const prevIsDisabled = this.state.prevIsDisabled ? "disabled" : "";
    const nextIsDisabled = this.state.nextIsDisabled ? "disabled" : "";
    return (
      <>
        <Select
          list={this.state.names}
          pokemonSelected={this.pokemonSelected}
        />
        {this.state.selectedPokemonObject && (
          <Card
            pokemonSelected={this.pokemonSelected}
            picture={this.state.selectedPokemonObject.url}
            name={this.state.selectedPokemonObject.name}
            description={this.state.selectedPokemonObject.description}
          />
        )}
        {this.state.selectedPokemonObject && (
          <div className="btnRow">
            <button
              className={prevIsDisabled}
              onClick={() => this.flipPage(-1)}
            >
              Previous
            </button>
            <button className={nextIsDisabled} onClick={() => this.flipPage(1)}>
              Next
            </button>
          </div>
        )}
      </>
    );
  }
}
