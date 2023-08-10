'use strict';

require('dotenv/config');
const { exec } = require('child_process');
const { getBuildInfo } = require('./src/app/global/utils');


(async () => {
  const config = {
    extensionId: process.env.GOOGLE_EXTENSION_ID,
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
  };

  const latestBuildInfo = getBuildInfo();

  const deployExtension = () => {
    let command, creds;

    creds = `--client-id "${config.clientId}" `;
    creds += `--client-secret "${config.clientSecret}" `;
    creds += `--refresh-token "${config.refreshToken}" `;
    creds += `--extension-id "${config.extensionId}" `;

    command = `npx chrome-webstore-upload upload --source "${latestBuildInfo.releasePath}" ${creds} `;
    command += `&& npx chrome-webstore-upload publish ${creds}`;

    exec(command, { timeout: 60000 }, (error, stdout, stderr) => {
      if (error) {
        console.error('An error occurred while deploying the extension:');
        if (stderr) {
          console.error(stderr); // Выводим детали ошибки из stderr
        } else {
          console.error(error); // Если stderr пуст, выводим стандартное сообщение об ошибке
        }
        return;
      }

      console.log('Extension successfully deployed.');
      console.log(`stdout: ${stdout}`);
    });
  };

  deployExtension();
})();
