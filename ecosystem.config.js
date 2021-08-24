//.env와 같이 사용할 경우 뭐가 우선시 되는건가....
module.exports = {
    apps : [
        {
          name: "fadu-fds",
          script: "./src/index.ts",
          watch: true,
          exec_mode: "cluster",
          instances: 0,
          env: {
              "PORT": 9000,
              "NODE_ENV": "development"
          },
          env_production: {
              "PORT": 80,
              "NODE_ENV": "production",
          }
        }
    ]
}