const GuessItem = ({guess, feedback}) => {
  const getColor = (feedbackValue) => {
    switch (feedbackValue) {
      case 'G':
        return "cell-green";
      case 'Y':
        return "cell-yellow";
      case 'R':
        return "cell-red";
      default:
        return "";
    }
  }

  const {song_title, artist, ...feedbackFields} = guess;

  return (
    <div className="guess-item">
        <div className="song-info">{song_title} / {artist}</div>
        <div className="feedback-squares">
          {Object.keys(feedbackFields).map(key => (
            <div key={key} className={`cell ${getColor(feedback[key])}`}>
              {guess[key]}
            </div>
          ))}
        </div>
    </div>
  )
}

export default GuessItem