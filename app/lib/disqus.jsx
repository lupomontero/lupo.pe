const debounce = (func, wait, runOnFirstCall) => {
  let timeout;

  return (...args) => {
    const deferredExecution = () => {
      timeout = null;

      if (!runOnFirstCall) {
        func(args);
      }
    };

    const callNow = runOnFirstCall && !timeout;

    window.clearTimeout(timeout);
    timeout = setTimeout(deferredExecution, wait);

    if (callNow) {
      func(args);
    }
  };
};

const insertScript = (src, id) => {
  const script = window.document.createElement('script');
  script.async = true;
  script.src = src;
  script.id = id;
  document.body.appendChild(script);
  return script;
};

const queueResetCount = debounce(
  () => {
    if (window.DISQUSWIDGETS) {
      window.DISQUSWIDGETS.getCount({ reset: true });
    }
  },
  300,
  false,
);

export const CommentCount = ({
  shortname,
  config,
  children,
  className,
  ...rest
}) => {
  const scriptId = 'dsq-recs-scr';

  const onRef = (el) => {
    if (!el) {
      return;
    }

    if (!document.getElementById(scriptId)) {
      insertScript(`https://${shortname}.disqus.com/count.js`, scriptId);
    } else {
      queueResetCount();
    }
  };

  const additionalClass = className ? ` ${className}` : '';

  return (
    <span
      {...rest}
      ref={onRef}
      className={`disqus-comment-count${additionalClass}`}
      data-disqus-identifier={config.identifier}
      data-disqus-url={config.url}
    >
      {children}
    </span>
  );
};

const getDisqusConfig = (config) => function () {
  this.page.identifier = config.identifier;
  this.page.url = config.url;
  this.page.title = config.title;
  this.page.category_id = config.categoryID;
  this.page.remote_auth_s3 = config.remoteAuthS3;
  this.page.api_key = config.apiKey;

  if (config.sso) {
    this.sso = config.sso;
  }

  if (config.language) {
    this.language = config.language;
  }

  [
    'preData',
    'preInit',
    'onInit',
    'onReady',
    'afterRender',
    'preReset',
    'onIdentify',
    'beforeComment',
    'onNewComment',
    'onPaginate',
  ].forEach(callbackName => {
    this.callbacks[callbackName] = [
      config[callbackName],
    ];
  });
};

export const DiscussionEmbed = ({ shortname, config, ...rest }) => {
  const THREAD_ID = 'disqus_thread';
  const scriptId = 'dsq-embed-scr';

  const onRef = (el) => {
    if (!el) {
      return;
    }

    const disqusConfig = getDisqusConfig(config);

    if (!window.DISQUS || !document.getElementById(scriptId)) {
      window.disqus_config = disqusConfig;
      window.disqus_shortname = shortname;
      insertScript(`https://${shortname}.disqus.com/embed.js`, scriptId);
    } else {
      window.DISQUS.reset({
        reload: true,
        config: disqusConfig,
      });
    }
  };

  return (
    <div
      {...rest}
      id={THREAD_ID}
      ref={onRef}
    />
  );
};
