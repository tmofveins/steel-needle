import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";

const GuessItem = ({guess, feedback}) => {
  const getFeedbackDetails = (feedbackValue) => {
    let icon = null, color = "";

    switch (feedbackValue) {
      case 'G':
        color = "cell-green";
        break;
      case 'Y':
        color = "cell-yellow";
        break;
      case 'YU':
        icon = faArrowUp;
        color = "cell-yellow";
        break;
      case 'YD':
        icon = faArrowDown;
        color = "cell-yellow";
        break;
      case 'R':
        color =  "cell-red";
        break;
      case 'RU':
        icon = faArrowUp;
        color =  "cell-red";
        break;
      case 'RD':
        icon = faArrowDown;
        color =  "cell-red";
        break;
      default:
        break;
    }

    return {icon, color};
  }

  const {song_id, title_romaji, title_ascii, used, date_used,
          song_title, artist, ...feedbackFields} = guess;
        
  guess.date = guess.date.slice(0,4);

  return (
    <div className="guess-item">
        <div className="song-info">{song_title} / {artist}</div>
        <div className="feedback-squares">
          {Object.entries(feedback).map(([key, value]) => {
            const {icon, color} = getFeedbackDetails(value);
            return (
              <div key={key} className={`cell ${color}`}>
                {icon && <FontAwesomeIcon icon={icon}/>}
                {guess[key]}
              </div>
            );
          })}
        </div>
    </div>
  )
}

export default GuessItem;