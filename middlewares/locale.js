import i18next from 'i18next';
import path from 'path';
import FileI18N from 'i18next-node-fs-backend';
import { handle, LanguageDetector } from 'i18next-express-middleware'

// const middleware = require('i18next-express-middleware');

const FilesystemBackend = new FileI18N({}, {
  loadPath: path.join(__dirname, '/locales/{{lng}}/{{ns}}.json'),
  // addPath: path.join(__dirname, '/locales/{{lng}}/{{ns}}.missing.json'),
});

i18next
  .use(LanguageDetector)
  .use(FilesystemBackend)
  .init({
    // debug: true,
    preload: ['en', 'vi'],
    fallbackNS: ['translation'],
    // fallbackLng: ['en'],
    initImmediate: false,
    detection: {
      cache: false,
      order: ['querystring', 'header'], // accept-language
      lookupQuerystring: 'lang',
    },
  })

export default handle(i18next, {});