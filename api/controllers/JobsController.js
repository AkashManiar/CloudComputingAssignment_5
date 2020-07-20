let isSuccess = false;
let message = ""

module.exports = {
  getJobs: function(req, res){
    sails.models.jobs.find({}).exec((err,jobs) => {
      if(err){
        throw err;
      }
      if(jobs.length===0){
          message = 'Jobs446 table does not have any records. Click "Add Job" to add new record.'
          res.view('pages/view-jobs', {success: false , message });
      } else if (isSuccess) {
          isSuccess = false;
          res.view('pages/view-jobs', {jobs: jobs, success:true, message });
      } else {
          res.view('pages/view-jobs', {jobs: jobs});
      }
      });
  },
  addJob: function(req, res){
    var newJob = {
      id:req.body.jobId,
      partId446:req.body.partId, 
      qty446:req.body.qty
    };
    sails.models.jobs.create(newJob).exec(err => {
      if(err){
        res.view('pages/add-job', { message: "Entry with provided Job Id and Part Id already exist. Try different JobId or PartId. " })
      }
      else {
        isSuccess = true;
        message = "Job added successfully!"
        res.redirect('/API446/jobs');
      }
    });
  },
  editJob: function(req,res){
    const job = {
      jobId: req.body.jobId,
      partId: req.body.partId,
      qty: req.body.qty
    }
    res.view('pages/edit-job', { job })
  },
  editJobDetail: function(req, res) {
    const job = {
      partId446: +req.body.partId,
      qty446: +req.body.qty
    }
    sails.models.jobs.update({id: req.param('jobId') }, job).exec(err => {
      if (err) {
        res.view('pages/edit-job', { message: 'Error occurred in updating job detail. Please try again.' })
      } else {
        isSuccess = true;
        message = "Successfully updated job details!"
        res.redirect('/API446/jobs');
      }
    })
  },
  deleteJob: function(req,res) {
    sails.models.jobs.destroy({id: req.param('jobId')}).exec((err)=>{
      if(err){
        res.send({ error: true, message: "Some error occurred in deleting entry." })
      }
      else{
        res.redirect('/API446/jobs');
      }
    });
    return false;
  }
};
