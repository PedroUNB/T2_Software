module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current'
        }
      }
    ],
    '@babel/preset-typescript'
  ],
  plugins: [
    ['module-resolver', {
      alias: {
        '@models': './src/app/models',
        '@controllers': './src/app/controllers',
        '@interfaces': './src/app/interfaces',
        '@config': './src/config'
      }
    }]
  ],
  ignore: [
    '**/*.spec.ts'
  ]
}
