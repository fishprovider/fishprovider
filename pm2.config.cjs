const envBackend = {
  HUSKY: 0,
  DOPPLER_PROJECT: 'backend',
  DOPPLER_CONFIG: 'prd',
};

const appConfigs = [
  {
    name: 'cron',
  },
  {
    name: 'bot',
  },
];

const apps = appConfigs.map(({
  workspace = 'workers',
  name,
  env,
}) => ({
  name,
  env: {
    ...envBackend,
    ...env,
  },
  script: 'npm',
  args: `run start -w ${workspace}/${name}`,
}));

const deploy = {
  localhost: {
    user: 'marco',
    host: ['localhost'],
    repo: 'git@gitlab.com:fishprovider/main.git',
    ref: 'origin/master',
    path: '/tmp/pm2-apps/fishprovider',
    'post-deploy': 'git rev-parse HEAD',
  },
};

module.exports = {
  apps,
  deploy,
};
