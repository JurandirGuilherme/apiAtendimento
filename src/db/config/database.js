import "dotenv/config";

const config = {
  username: process.env.USERDB,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  host: process.env.HOST,
  port: process.env.PORT,
  dialect: process.env.DIALECT,
  define: {
    timestamps: true,
  },
};
export default config;
