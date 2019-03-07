//imports dependencies and files
import React, { Component } from "react";
import Navbar from "./components/Navbar";
import Jumbotron from "./components/Jumbotron";
import FriendCard from "./components/FriendCard";
import Footer from "./components/Footer";
import img from "./img.json";
import "./App.css";

//sets state to 0 or empty
class App extends Component {
  state = {
    img,
    clickedFish: [],
    score: 0
  };

//when you click on a card ... the img is taken out of the array
  imageClick = event => {
    const currentImg = event.target.alt;
    const FishAlreadyClicked =
      this.state.clickedFish.indexOf(currentImg) > -1;

//if you click on img that has already been selected, the game is reset and cards reordered
    if (FishAlreadyClicked) {
      this.setState({
        img: this.state.img.sort(function(a, b) {
          return 0.5 - Math.random();
        }),
        clickedFish: [],
        score: 0
      });
        alert("You lose. Play again?");

//if you click on an available img, your score is increased and cards reordered
    } else {
      this.setState(
        {
          img: this.state.img.sort(function(a, b) {
            return 0.5 - Math.random();
          }),
          clickedFish: this.state.clickedFish.concat(
            currentImg
          ),
          score: this.state.score + 1
        },
//when 12 are answered      
        () => {
          if (this.state.score === 12) {
            alert("Yay! You Win!");
            this.setState({
              img: this.state.img.sort(function(a, b) {
                return 0.5 - Math.random();
              }),
              clickedFish: [],
              score: 0
            });
          }
        }
      );
    }
  };

//the order of components to be rendered: navbar, jumbotron, friendcard, footer 
  render() {
    return (
      <div>
        <Navbar 
          score={this.state.score}
        />
        <Jumbotron />
        <div className="wrapper">
          {this.state.img.map(img => (
            <FriendCard
              imageClick={this.imageClick}
              id={img.id}
              key={img.id}
              image={img.image}
            />
          ))}
        </div>
        <Footer />
      </div>
    );
  }
}
export default App;