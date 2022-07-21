export class Game {
    public players: string[] = [];
    public stack: string[] = [];
    public playedCards: string[] = [];
    public currentPlayer: number = 0;
    public currentCard: string = '';


    constructor() { // wird immer zuerst ausgeführt 
        for(let i=1; i<14; i++) { // durch die For-schleifen werden alle Karten in die Game variable in das Array Stack gegeben
          this.stack.push('ace_' + i);
          this.stack.push('clubs_' + i);
          this.stack.push('diamonds_' + i);
          this.stack.push('hearts_' + i);
        }
       
        shuffle(this.stack);
    }
}

function shuffle(array:any) { //mischt die Karten (stackoverflow)
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }
  
 
  