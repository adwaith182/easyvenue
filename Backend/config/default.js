module.exports = {
  api: {
    port: 3006,
    root: '/api',
  },
  frontEnd: {
    // domain: 'https://labs.eazyvenue.com/',
    // picPath: 'https://labs-api.eazyvenue.com:',
    domain: 'http://localhost:4200/', // local
    picPath: 'http://localhost:3006/', // local
  },
  auth: {
    jwt: {
      accessTokenSecret: 'A78D2E0F6823BF1F437C3E2B64D7D6C5098407C8B21D92E12D62B43527E00A97',
      refreshTokenSecret: 'y6DNKhzqRdGthMBDsYclOUcCGenNZ42GKqi7Vh17wvJDRggK8eUGD7j4H9swh2G',
      accessTokenLife: 75600,
      refreshTokenLife: 2592000,
    },
    resetPassword: {
      secret: '56gXxY{+D6/4m#kZ394j2=bT2eHqTAu>r8zAT>yEn:;TM#9*Vg',
      ttl: 86400 * 1000, // 1 day
      algorithm: 'aes256',
      inputEncoding: 'utf8',
      outputEncoding: 'hex',
    },
  },
  db: {
    url: 'mongodb://localhost:27017/eazyvenue-labs',
    name: 'eazyvenue-labs',
  },
  picture: {
    profilePicFolder: 'src/public/uploads/profilepic/',
    showPicFolderPath: 'uploads/profilepic/',
    defaultPicFolderPath: 'images/',
    bannerImageFolder: 'src/public/uploads/bannerimage/',
    showBannerPicFolderPath: 'uploads/bannerimage/',
    defaultPicFolderPath: 'images/',
    cmsPicFolder: 'src/public/uploads/cmsPic/',
    showCmsPicFolderPath: 'uploads/cmsPic/',
    venuePicFolder: 'src/public/uploads/venuePic/',
    showVenuePicFolderPath: 'uploads/venuePic/',
    decorPicFolder: 'src/public/uploads/decorPic/',
    showDecorPicFolderPath: 'uploads/decorPic/',
    venueVideoFolder: 'src/public/uploads/venueVideo/',
    showVenueVideoFolderPath: 'uploads/venueVideo/',
    categoryPicFolder: 'src/public/uploads/categoryPic/',
    showCategoryPicFolderPath: 'uploads/categoryPic/',

    portfolioPicFolder: 'src/public/uploads/portfolioPic/',
    showPortfolioPicFolderPath: 'uploads/portfolioPic/',
    venueCSVFolder: 'src/public/uploads/venueCsv/',
    showPortfolioPicFolderPath: 'uploads/venueCsv/',
  },
  logger: {
    console: {
      level: 'info',
    },
    file: {
      logDir: 'logs',
      logFile: 'info_node.log',
      level: 'info',
      maxsize: 1024 * 1024 * 10, // 10MB
      maxFiles: 5,
    },
  },
  errorLogger: {
    console: {
      level: 'error',
    },
    file: {
      logDir: 'logs',
      logFile: 'error_node.log',
      level: 'error',
      maxsize: 1024 * 1024 * 10, // 10MB
      maxFiles: 5,
    },
  },
  sms: {
    smsapi: 'https://api2.nexgplatforms.com/sms/1/text/query',
    username: 'EzyvnuGuiT',
    password: 'Anchal@123',
    from: 'EZYVNU',
    indiaDltContentTemplateId: '1207168932394709023',
    indiaDltPrincipalEntityId: '1201166521573805146',
  },
};
