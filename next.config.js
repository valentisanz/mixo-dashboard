module.exports = {
  async redirects() {
    return [
      {
        source: "/dashboard",
        destination: "/dashboard/machines",
        permanent: true,
      },
    ];
  },
};
