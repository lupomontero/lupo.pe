import { useEffect, useState } from 'react';

const Social = () => {
  const [profiles, setProfiles] = useState();

  useEffect(() => {
    fetch('/data/social.json')
      .then(resp => resp.json())
      .then(setProfiles)
      .catch(setProfiles);
  }, []);

  if (!profiles) {
    return <>Loading...</>;
  }

  if (profiles instanceof Error) {
    return <>Error loading social profiles.</>;
  }

  return (
    <div className="Social">
      {profiles.map(item => (
        <div key={item.title}>
          <a
            href={item.url}
            title={item.title}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div dangerouslySetInnerHTML={{ __html: item.icon }} />
          </a>
        </div>
      ))}
    </div>
  );
};

export default Social;
