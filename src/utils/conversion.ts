/**
 * Fonctions de conversion entre les ratings Lichess et Chess.com
 * Formules polynomiales de degré 7
 * 
 * 
 

une personne qui aurait 1500elo sur lichess, il serait quel elo sur chess? en se basant sur la precision pour faire la correspondance.
fait un programme pour le savoir
------
Fait moi le grapique ou j'ai en abicesse le elo chesscom, et en ordonné le elo lichess
Fait commencer chesscom a 150elo et fait le finir a 2500
----
Fait moi l'approximation d'un polynome au 20ieme degres de cette fonction
Et donne moi sa fonction.
Donne moi tous les numeros apres la virgule des coefficiants. Je veux au moins une precision a 25 chiffres. affiche sous forme de array de nombre Decimal
Modifie bien la fonction str, pour dire d'ecrire la precision de 25
 */

export const convertLichessToChesscom = (lichessRating: number): number => {
  const x = lichessRating;
  return (
    -2.353783698019859e-57 * Math.pow(x, 20) +
    4.543994430347881e-53 * Math.pow(x, 19) +
    -3.6749705003365024e-49 * Math.pow(x, 18) +
    1.525640443640019e-45 * Math.pow(x, 17) +
    -2.7831036709048628e-42 * Math.pow(x, 16) +
    -2.263041711376188e-39 * Math.pow(x, 15) +
    1.967452930593192e-35 * Math.pow(x, 14) +
    -1.6299316927477007e-32 * Math.pow(x, 13) +
    -9.304397186722809e-29 * Math.pow(x, 12) +
    2.4960268912735315e-25 * Math.pow(x, 11) +
    8.997960261194114e-23 * Math.pow(x, 10) +
    -1.750488332570652e-18 * Math.pow(x, 9) +
    4.709470715840608e-15 * Math.pow(x, 8) +
    -7.368644819116138e-12 * Math.pow(x, 7) +
    7.816473365764003e-9 * Math.pow(x, 6) +
    -5.869047133300792e-6 * Math.pow(x, 5) +
    0.0031343669851908607 * Math.pow(x, 4) +
    -1.1661696185208208 * Math.pow(x, 3) +
    287.264176976182 * Math.pow(x, 2) +
    -42060.07938610531 * x +
    2766724.686389653
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