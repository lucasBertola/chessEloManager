/**
 * Fonctions de conversion entre les ratings Lichess et Chess.com
 * Formules polynomiales de degré 7
 * 
 * 
 


Fait moi le grapique ou j'ai en abicesse le elo chesscom, et en ordonné le elo lichess
Fait commencer chesscom a 150elo et fait le finir a 2500
----

Fait moi l'approximation d'un polynome au 18ieme degres de cette fonction
Et donne moi sa fonction.
Donne moi tous les numeros apres la virgule des coefficiants. Je veux au moins une precision a 25 chiffres. affiche sous forme de array de nombre 

(hesite pas a utiliser le type decimal.Decimal  pour avoir assez de precision)

 */

export const convertLichessToChesscom = (lichessRating: number): number => {
  const x = lichessRating;
  return (
    -1.564344693910447635e-19 * Math.pow(x, 7) +
    1.918172896212396419e-15 * Math.pow(x, 6) +
    -9.604852714700698433e-12 * Math.pow(x, 5) +
    2.531070597589738935e-8 * Math.pow(x, 4) +
    -3.776776683098590279e-5 * Math.pow(x, 3) +
    3.203797711117362806e-2 * Math.pow(x, 2) +
    -1.337007834172812082e1 * x +
    2.250012050866800109e3
  );
};

export const convertChesscomToLichess = (chesscomRating: number): number => {
  const x = chesscomRating;
  return (
    1.7639469181852863e-57 * Math.pow(x, 20) +
    -3.503276406163606e-53 * Math.pow(x, 19) +
    2.996208651936833e-49 * Math.pow(x, 18) +
    -1.39025301148134e-45 * Math.pow(x, 17) +
    3.390596860045531e-42 * Math.pow(x, 16) +
    -1.5882312737290982e-39 * Math.pow(x, 15) +
    -1.5664940895424112e-35 * Math.pow(x, 14) +
    4.349163524267709e-32 * Math.pow(x, 13) +
    -4.6321149617899264e-30 * Math.pow(x, 12) +
    -2.5526978251683037e-25 * Math.pow(x, 11) +
    8.108404311243865e-22 * Math.pow(x, 10) +
    -1.4545029674426438e-18 * Math.pow(x, 9) +
    1.778151943394629e-15 * Math.pow(x, 8) +
    -1.5630252787732968e-12 * Math.pow(x, 7) +
    1.0025664003343438e-9 * Math.pow(x, 6) +
    -4.6697418813523977e-7 * Math.pow(x, 5) +
    0.00015476471972797906 * Math.pow(x, 4) +
    -0.035130555247902345 * Math.pow(x, 3) +
    5.113558055965835 * Math.pow(x, 2) +
    -421.0123794543023 * x +
    15032.853712717828
  );
};