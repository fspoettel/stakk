import app from './app';

const server = app.listen(app.get('port'), () => {
  console.log(`App is running at ${app.get('port')}`);
  console.log('Press Ctrl-C to stop it\n');
});

export default server;
