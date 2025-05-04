const Talks = ({ talks }) => {
  const getUrl = (talk) => {
    const video = talk.links.find(({ type }) => type === 'video');
    if (video) {
      return video.url;
    }
    const slides = talk.links.find(({ type }) => type === 'slides');
    if (slides) {
      return slides.url;
    }
    return '#';
  };

  const filteredTalks = talks.filter(({ thumb }) => !!thumb);


  return (
    <div className="Talks">
      <h2>Talks</h2>
      <div>
        {filteredTalks.map(item => (
          <a
            key={item.title}
            style={{
              backgroundImage: item && item.thumb ? `url("${item.thumb}")` : 'none',
            }}
            href={getUrl(item)}
            target="_blank"
            rel="noopener noreferrer"
          >
            {item.title}
          </a>
        ))}
      </div>
    </div>
  );
};

export default Talks;
