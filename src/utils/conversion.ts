/**
 * Fonctions de conversion entre les ratings Lichess et Chess.com
 * Formules polynomiales de degré 7
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
    2.188199697721714960e-19 * Math.pow(x, 7) +
    -2.195273888787369291e-15 * Math.pow(x, 6) +
    8.877826440835283016e-12 * Math.pow(x, 5) +
    -1.851446825815325535e-8 * Math.pow(x, 4) +
    2.120738119166150020e-5 * Math.pow(x, 3) +
    -1.326625621116909147e-2 * Math.pow(x, 2) +
    5.111858478875868528 * x +
    -8.776270106321587150e1
  );
}; 