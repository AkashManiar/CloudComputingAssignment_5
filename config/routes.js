module.exports.routes = {
  '/': { view: 'pages/home' },
  'GET /API446/jobs' : 'JobsController.getJobs',
  'GET /API446/addJob' : {view: 'pages/add-job'},
  'POST /API446/addJob' : 'JobsController.addJob',
  'POST /API446/deleteJob/:jobId/:partId' : 'JobsController.deleteJob',
  'POST /API446/editJob' : 'JobsController.editJob',
  'POST /API446/editJobDetail/:jobId': 'JobsController.editJobDetail'
};
