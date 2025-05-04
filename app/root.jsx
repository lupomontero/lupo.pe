import {
  Links,
  Meta,
  Outlet,
  Scripts,
} from '@remix-run/react';
import Header from './components/Header';
import appStylesHref from './root.css?url';

export const links = () => [
  { rel: 'stylesheet', href: appStylesHref },
  { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=VT323|Roboto+Mono' },
];

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Lupo Montero | @lupomontero</title>
        <meta name="description" content="Director of Technology and Head JavaScript Coach at @LaboratoriaLA, Co-organizer at @LimaJSorg, @node_lima, @mozillaperu and @CausaConf." />
        <meta name="theme-color" content="#222222" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#ffc40d" />
        <Meta />
        <Links />
      </head>
      <body>
        <div className="App">
          <Header />
          <Outlet />
        </div>
        <Scripts />
        <script id="dsq-count-scr" src="//lupomontero.disqus.com/count.js" async></script>
      </body>
    </html>
  );
}
