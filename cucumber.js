export default {
  default: {
    timeout: 60000, // 60 seconds timeout for all steps
    require: ['features/step-definations/*.js'],
    format: ['progress', 'json:cucumber-report.json'],
    formatOptions: {
      snippetInterface: 'async-await'
    }
  }
};
