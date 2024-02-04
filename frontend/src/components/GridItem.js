const GridItem = ({ song }) => {
    return (
        <div className="grid-item">
            <div className="item-header">{song.song_title}</div>
            <div className="item-value">{song.title_romaji} / {song.artist}</div>
        </div>
    );
}

export default GridItem;