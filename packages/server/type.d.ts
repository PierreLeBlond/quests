declare namespace Lucia {
  type Auth = import("./src/lucia.js").Auth;
  type DatabaseUserAttributes = {
    github_username: string;
  };
  type DatabaseSessionAttributes = {};
}
