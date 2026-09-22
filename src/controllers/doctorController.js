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

module.exports = {
    getTopDoctorHome: getTopDoctorHome
}
