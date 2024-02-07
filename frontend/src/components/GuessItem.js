const GuessItem = ({feedback}) => {
  return (
    <div className="guess-item">
        {feedback.song_title} / {feedback.artist}
    </div>
  )
}

export default GuessItem