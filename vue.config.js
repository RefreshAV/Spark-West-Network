module.exports = {
  pwa: {
    name: 'Spark West Network'
  },
  css: {
    extract: false
  },
  devServer: {
    // In some browsers, Firestore will only load if the local server is running on HTTPS.
    // To enable: HTTPS=true npm run serve
    https: !!process.env.HTTPS
  }
}
