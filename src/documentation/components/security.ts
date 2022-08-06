const securities = {
  bearerAuth: {
    type: 'apiKey',
    name: 'Authorization',
    in: 'header',
    scheme: 'bearer',
    bearerFormat: 'JWT',
    description: "Input a 'Bearer Token' in your authorization to authorize it",
    schema: {
      type: 'string',
      example:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjM1MjA3MTA0fQ.0ut3Q6TMrJt3NldLobKvFinIZLc_WbiQL7LYmej7PVI',
    },
  },
};

export default securities;
