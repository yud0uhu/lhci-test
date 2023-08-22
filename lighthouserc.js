module.exports = {
  ci: {
    collect: {
      numberOfRuns: 1,
      startServerCommand: "npm run start",
      url: ["https://tv.dmm.com/vod/"],
    },
    upload: {
      target: "temporary-public-storage",
    },
  },
};
