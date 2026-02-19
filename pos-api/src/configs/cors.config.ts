const whiteList = [
  'https://pos-app-web-development-37.vercel.app/',
  'https://pos-app-web-development-37-32w6f7uqc.vercel.app/',
  'https://pos-app-web-development-git-1444ac-ryanfandygmailcoms-projects.vercel.app/',
];

export const corsOptions = {
  origin: function (
    origin: string | undefined,
    callback: (err: Error | null, allow?: boolean) => void,
  ) {
    // if (!origin) {
    //   return callback(null, true);
    // }

    if (whiteList.includes(origin!)) {
      callback(null, true);
    } else {
      callback(new Error('Origin not allowed by CORS'));
    }
  },
  credentials: true,
};
