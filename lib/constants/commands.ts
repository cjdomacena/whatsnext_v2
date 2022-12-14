export const SEARCH_COMMAND = {
  name: "wnsearch",
  description: "search for your favorite movie or something",
  options: [
    {
      name: "type",
      description: "type either a movie or tv",
      type: 3,
      required: true,
    },
    {
      name: "query",
      description: "query string",
      type: 3,
      required: true,
    },
  ],
};

export const INVITE_COMMAND = {
  name: "invite",
  description: "get an invite link to add the bot to your server",
};
