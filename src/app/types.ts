/**
 * Poll interface - Includes all the data types for polling screen
 */
export interface Polls extends PollForm{
  id: number; // 12
  votes: number[]; // [8,5,6,4]
  voted: boolean;
}

/**
 * Voter Insterface - Details of Voter
 */
export interface voter{
  id: string; // Metamask ID
  voted: []; // [12] Shows the ID of poll if voter has voted
}

export interface PollForm{
  question: string; // Which type of cold desert you like the most?
  image: string; // image.png
  options: string[]; // ["Ice-cream","Yogurt","Gelato","Sorbet"]
}

export interface PollVote{
  id: number; // 12
  vote: number;
}
