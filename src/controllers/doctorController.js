import doctorService from "../services/doctorService";


let getTopDoctorHome = async (req, res) => { 
    try{
        const limit = req.query.limit ? Number.parseInt(req.query.limit, 10) : 10;
        const response = await doctorService.getTopDoctorHome(limit);
        return res.status(200).json(response);
        
    }catch(e){
        console.log('getTopDoctorHome controller error:', e);
        return res.status(200).json({
            errCode: -1,
            message: e.message
        })
    }
}

let getAllDoctors = async (req, res) => {
    try{
        let doctors = await doctorService.getAllDoctors();
        return res.status(200).json(doctors)
    }catch(e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

let postInforDoctor = async (req, res) => {
    try{
        let response = await doctorService.saveDetailInforDoctor(req.body);
        return res.status(200).json(response);
    }catch(e) {
         console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
} 
module.exports = {
    getTopDoctorHome: getTopDoctorHome,
    getAllDoctors: getAllDoctors,
    postInforDoctor: postInforDoctor
}
