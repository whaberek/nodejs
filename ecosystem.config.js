module.exports = {
  apps: [{
    name: 'test-api',
    script: 'bin/www',
    instances: process.env.TEST_API_INSTANCES,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
  }],
};
